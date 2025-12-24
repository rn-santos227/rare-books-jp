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


}
