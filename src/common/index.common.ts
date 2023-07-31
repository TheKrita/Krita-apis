import { Request, Response } from "express"

export const rawBodyBuffer = (
	req: Request | any,
	res: Response,
	buf: Buffer,
	encoding: BufferEncoding
) => {
	if (buf && buf.length) {
		req.rawBody = buf.toString(encoding || "utf8")
	}
}
