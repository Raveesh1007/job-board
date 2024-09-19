import { z } from 'zod';

export const CommunitySchema = z.object({
  name: z.string().min(3).max(225),
  description: z.string().optional(),
});

export const QuestionSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  body: z.string().min(3, 'Question body is required'),
  communityId: z.string().min(1, 'Community ID is required'),
  userId: z.string().min(1, 'User ID is required'),
});

export const AnswerSchema = z.object({
  body: z.string().min(3, 'Answer body is required'),
  questionId: z.string().min(1, 'Question ID is required'),
  userId: z.string().min(1, 'User ID is required'),
});

export const CommentSchema = z
  .object({
    body: z.string().min(1, 'Comment body is required'),
    userId: z.string().min(1, 'User ID is required'),
    questionId: z.string().optional(),
    answerId: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.questionId && !data.answerId) {
      return ctx.addIssue({
        path: ['questionId', 'answerId'],
        message: 'Either questionId or answerId is required',
        code: z.ZodIssueCode.custom,
      });
    }
  });

export const VoteSchema = z
  .object({
    value: z.enum(['1', '-1'], {
      message: 'Vote must be either 1 (upvote) or -1 (downvote)',
    }),
    userId: z.string().min(1, 'User ID is required'),
    questionId: z.string().optional(), // Can vote on either question or answer
    answerId: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.questionId && !data.answerId) {
      return ctx.addIssue({
        path: ['questionId', 'answerId'],
        message: 'Either questionId or answerId is required',
        code: z.ZodIssueCode.custom,
      });
    }
  });

export const UserSchema = z.object({
  name: z.string().min(1, 'User name is required'),
  email: z.string().email('Invalid email').min(1, 'Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  avatar: z.string().url().optional(),
});
