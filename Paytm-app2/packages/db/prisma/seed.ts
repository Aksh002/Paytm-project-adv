import { PrismaClient } from '../generated/prisma'
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient()

/*
To run this seed file and add this mock data in db:-
  Step1:- Update /packages/db/package.json with:-
          "prisma": {
            "seed": "ts-node prisma/seed.ts"
          }
  Step2:- Run cmd to seed db:-
          npx prisma db seed
*/

async function main() {
  const aliceHashPswd = await bcrypt.hash('alice',10);
  const bobHashPswd = await bcrypt.hash('bob',10);
  const alice = await prisma.user.upsert({
    where: { number: '9999999999' },
    update: {},
    create: {
      email:'alice@gmail.com',
      number: '9999999999',
      password: aliceHashPswd,
      name: 'alice',
      auth_type:'Credentials',
      Balance: {
        create: {
            amount: 20000,
            locked: 0
        }
      },
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
      password: bobHashPswd,
      name: 'bob',
      auth_type:'Credentials',
      Balance: {
        create: {
            amount: 2000,
            locked: 0
        }
      },
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




  /*                    Reseting db
-npx prisma migrate reset:-
    What this command does:
      -Drops your current database.
      -Creates a new, empty database with the same name.
      -Applies all your existing migrations to recreate the table structure.
      -Runs your seed script (seed.ts) to populate the database with initial data.
  */