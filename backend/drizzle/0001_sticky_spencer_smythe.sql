ALTER TABLE "answer" ALTER COLUMN "createdAt" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "answer" ALTER COLUMN "lastEditedAt" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "commentAnswer" ALTER COLUMN "createdAt" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "commentAnswer" ALTER COLUMN "lastEditedAt" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "commentQuestion" ALTER COLUMN "createdAt" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "commentQuestion" ALTER COLUMN "lastEditedAt" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "question" ALTER COLUMN "createdAt" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "question" ALTER COLUMN "lastEditedAt" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "createdAt" SET DATA TYPE timestamp;