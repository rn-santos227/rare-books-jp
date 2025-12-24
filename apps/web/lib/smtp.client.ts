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

