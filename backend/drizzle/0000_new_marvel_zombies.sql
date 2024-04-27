DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('NOOB', 'PRO', 'ADMIN');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "answer" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"questionId" uuid NOT NULL,
	"authorId" uuid NOT NULL,
	"content" varchar(10000) NOT NULL,
	"createdAt" date DEFAULT now() NOT NULL,
	"lastEditedAt" date
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "commentAnswer" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"answerId" uuid NOT NULL,
	"authorId" uuid NOT NULL,
	"content" varchar(500) NOT NULL,
	"createdAt" date DEFAULT now() NOT NULL,
	"lastEditedAt" date
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "commentQuestion" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"questionId" uuid NOT NULL,
	"authorId" uuid NOT NULL,
	"content" varchar(500) NOT NULL,
	"createdAt" date DEFAULT now() NOT NULL,
	"lastEditedAt" date
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"authorId" uuid NOT NULL,
	"title" varchar(150) NOT NULL,
	"content" varchar(10000) NOT NULL,
	"createdAt" date DEFAULT now() NOT NULL,
	"lastEditedAt" date
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question_tag" (
	"questionId" uuid NOT NULL,
	"tagId" uuid NOT NULL,
	CONSTRAINT "question_tag_questionId_tagId_pk" PRIMARY KEY("questionId","tagId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ratingAnswer" (
	"answerId" uuid NOT NULL,
	"userId" uuid NOT NULL,
	"rating" smallint NOT NULL,
	CONSTRAINT "ratingAnswer_answerId_userId_pk" PRIMARY KEY("answerId","userId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tag" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(20) NOT NULL,
	CONSTRAINT "tag_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar NOT NULL,
	"password" varchar NOT NULL,
	"role" "role" DEFAULT 'NOOB' NOT NULL,
	"createdAt" date DEFAULT now() NOT NULL,
	CONSTRAINT "user_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "votesAnswer" (
	"answerId" uuid NOT NULL,
	"userId" uuid NOT NULL,
	"upvote" boolean NOT NULL,
	CONSTRAINT "votesAnswer_answerId_userId_pk" PRIMARY KEY("answerId","userId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "votesQuestion" (
	"questionId" uuid NOT NULL,
	"userId" uuid NOT NULL,
	"upvote" boolean NOT NULL,
	CONSTRAINT "votesQuestion_questionId_userId_pk" PRIMARY KEY("questionId","userId")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "answer" ADD CONSTRAINT "answer_questionId_question_id_fk" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "answer" ADD CONSTRAINT "answer_authorId_user_id_fk" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "commentAnswer" ADD CONSTRAINT "commentAnswer_answerId_answer_id_fk" FOREIGN KEY ("answerId") REFERENCES "answer"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "commentAnswer" ADD CONSTRAINT "commentAnswer_authorId_user_id_fk" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "commentQuestion" ADD CONSTRAINT "commentQuestion_questionId_question_id_fk" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "commentQuestion" ADD CONSTRAINT "commentQuestion_authorId_user_id_fk" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question" ADD CONSTRAINT "question_authorId_user_id_fk" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question_tag" ADD CONSTRAINT "question_tag_questionId_question_id_fk" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question_tag" ADD CONSTRAINT "question_tag_tagId_tag_id_fk" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ratingAnswer" ADD CONSTRAINT "ratingAnswer_answerId_answer_id_fk" FOREIGN KEY ("answerId") REFERENCES "answer"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ratingAnswer" ADD CONSTRAINT "ratingAnswer_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "votesAnswer" ADD CONSTRAINT "votesAnswer_answerId_answer_id_fk" FOREIGN KEY ("answerId") REFERENCES "answer"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "votesAnswer" ADD CONSTRAINT "votesAnswer_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "votesQuestion" ADD CONSTRAINT "votesQuestion_questionId_question_id_fk" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "votesQuestion" ADD CONSTRAINT "votesQuestion_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
