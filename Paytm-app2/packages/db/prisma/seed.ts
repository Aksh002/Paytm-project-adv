import { PrismaClient } from '../generated/prisma'
const prisma = new PrismaClient()

async function main() {
  const alice = await prisma.user.upsert({
    where: { number: '9999999999' },
    update: {},
    create: {
      email:'alice@gmail.com',
      number: '9999999999',
      password: 'alice',
      name: 'alice',
      auth_type:'Credentials',
      OnRampTransactions: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "122",
          provider: "HDFC Bank",
        },
      },
    },
  })
  const bob = await prisma.user.upsert({
    where: { number: '9999999998' },
    update: {},
    create: {
      email: 'bob@gmail.com',
      number: '9999999998',
      password: 'bob',
      name: 'bob',
      auth_type:'Credentials',
      OnRampTransactions: {
        create: {
          startTime: new Date(),
          status: "Failure",
          amount: 2000,
          token: "123",
          provider: "HDFC Bank",
        },
      },
    },
  })
  console.log({ alice, bob })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })