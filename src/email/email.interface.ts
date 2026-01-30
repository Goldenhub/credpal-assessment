export interface SendEmailJob {
  from: string;
  to: string;
  subject: string;
  html: string;
}
