import { z } from "zod"
import { prismaClient } from "../../lib/prisma"
import { FastifyInstance } from "fastify"
import { randomUUID } from "crypto";

export async function voteOnPoll(app: FastifyInstance) {
    app.post('/polls/:pollId/votes', async (request, reply) => {
        const voteOnPollBody = z.object({
            pollOptionId: z.string().uuid()
        });

        const voteOnPollParams = z.object({
            pollId: z.string().uuid()
        });

        const { pollOptionId } = voteOnPollBody.parse(request.body);
        const { pollId } = voteOnPollParams.parse(request.params);

        let { sessionId } = request.cookies;

        if (sessionId) {
            const userPreviousVoteOnPoll = await prismaClient.vote.findUnique({
                where: {
                    sessionId_pollId: {
                        pollId,
                        sessionId,
                    },
                }
            });

            if (userPreviousVoteOnPoll && userPreviousVoteOnPoll.pollOptionId !== pollOptionId) {
                await prismaClient.vote.delete({
                    where: {
                        id: userPreviousVoteOnPoll.id
                    }
                });
            } else if (userPreviousVoteOnPoll) {
                return reply.status(400).send({ message: 'You already voted on this poll.' });
            }
        }

        if (!sessionId) {
            sessionId = randomUUID();

            reply.setCookie('sessionId', sessionId, {
                path: '/',
                maxAge: 60 * 60 * 24 * 30,
                signed: true,
                httpOnly: true
            });
        }

        await prismaClient.vote.create({
            data: {
                sessionId,
                pollId,
                pollOptionId
            }
        });

        return reply.status(201).send();
    })

}