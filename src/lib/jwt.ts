import jwt, { SignOptions } from 'jsonwebtoken';
import { StringValue } from 'ms';

export function tokenize(
  payload: { userId: string; role: string },
  expiry: string | number
): string {
  if (!process.env.JWT_SECRET) {
    throw new Error("Unable to find secret");
  }

  const options: SignOptions = {
    algorithm: "HS256",
    expiresIn: expiry as StringValue,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET as string, options) as string;

  return token;
}

export function detokenize(token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    if (!process.env.JWT_SECRET) {
      reject(new Error("Unable to find secret"));
      return;
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}
