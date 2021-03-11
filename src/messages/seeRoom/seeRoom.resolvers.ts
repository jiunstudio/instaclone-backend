import { Resolvers } from "../../types"
import { protectedResolver } from "../../users/users.utils"

const resolvers: Resolvers = {
    Query: {
        seeRoom: protectedResolver((_, { id }, { client, loggedInUser }) => {
            return client.room.findFirst({
                where: {
                    id: id,
                    users: {
                        some: {
                            id: loggedInUser.id
                        }
                    }
                }
            })

        })
    }
}

export default resolvers