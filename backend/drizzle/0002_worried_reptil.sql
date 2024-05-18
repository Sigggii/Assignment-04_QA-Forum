ALTER TABLE "user" ALTER COLUMN "username" SET DATA TYPE varchar(30);--> statement-breakpoint
ALTER TABLE "answer" ADD COLUMN "approved" boolean DEFAULT false NOT NULL;