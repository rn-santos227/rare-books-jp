import net from "net";
import tls from "tls";

type SendEmailParams = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  password: string;
  from: string;
  to: string;
  subject: string;
  text: string;
};

export async function sendEmail({
  host,
  port,
  secure,
  user,
  password,
  from,
  to,
  subject,
  text,
}: SendEmailParams) {
  const socket = await new Promise<net.Socket>((resolve, reject) => {
    const onError = (error: Error) => reject(error);
    const connection = secure
      ? tls.connect({ host, port }, () => resolve(connection))
      : net.connect({ host, port }, () => resolve(connection));
    connection.once("error", onError);
  });

  const readResponse = () =>
    new Promise<{ code: number; message: string }>((resolve, reject) => {
      let buffer = "";
      const onData = (chunk: Buffer) => {
        buffer += chunk.toString("utf8");
        const lines = buffer.split("\r\n").filter(Boolean);
        const lastLine = lines[lines.length - 1];
        if (!lastLine) return;
        const code = Number.parseInt(lastLine.slice(0, 3), 10);
        const hasMore = lastLine[3] === "-";
        if (!Number.isNaN(code) && !hasMore) {
          socket.off("data", onData);
          resolve({ code, message: lastLine });
        }
      };
      socket.on("data", onData);
      socket.once("error", reject);
    });

  const sendCommand = async (command: string, expectedCode?: number) => {
    socket.write(`${command}\r\n`);
    const response = await readResponse();
    if (expectedCode && response.code !== expectedCode) {
      throw new Error(`SMTP error: ${response.message}`);
    }
    return response;
  };

  await readResponse();
  await sendCommand(`EHLO ${host}`, 250);
  await sendCommand("AUTH LOGIN", 334);
  await sendCommand(Buffer.from(user).toString("base64"), 334);
  await sendCommand(Buffer.from(password).toString("base64"), 235);
  await sendCommand(`MAIL FROM:<${from}>`, 250);
  await sendCommand(`RCPT TO:<${to}>`, 250);
  await sendCommand("DATA", 354);
  socket.write(
    [
      `From: ${from}`,
      `To: ${to}`,
      `Subject: ${subject}`,
      "Content-Type: text/plain; charset=utf-8",
      "",
      text,
      ".",
      "",
    ].join("\r\n"),
  );
  const dataResponse = await readResponse();
  if (dataResponse.code !== 250) {
    throw new Error(`SMTP error: ${dataResponse.message}`);
  }
  await sendCommand("QUIT");
  socket.end();
}
