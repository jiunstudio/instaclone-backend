import { Resolvers } from "../../types"
import { protectedResolver } from "../../users/users.utils"

const resolvers: Resolvers = {
    Mutation: {
        deletePhoto: protectedResolver(async (_, { id }, { client, loggedInUser }) => {
            const photo = await client.photo.findUnique({
                where: {
                    id
                },
                select: {
                    userId: true
                }
            })
            if (!photo) {
                return {
                    ok: false,
                    error: "Can't found photo"
                }
            }
            else if (photo.userId !== loggedInUser.id) {
                return {
                    ok: false,
                    error: "You don't have access to this Photo"
                }
            }
            else {
                await client.photo.delete({
                    where: {
                        id
                    }
                })
                return {
                    ok: true
                }
            }

        })
    }
}

export default resolvers