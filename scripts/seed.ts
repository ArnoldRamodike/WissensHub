const { PrismaClient} = require("@prisma/client");


const databse = new PrismaClient();

async function main() {
    try {
        await databse.category.createMany({
            data: [
                {name: "Accounting"},
                {name: "Web Development"},
                {name: "Cyber Security"},
                {name: "Marketing & Sales"},
                {name: "Music"},
                {name: "Photography & VideoGraphy"},
                {name: "Enginnering"},
            ]
        });

        console.log("success");
        
    } catch (error) {
        console.log("Error seeding the databse categories", error);
    }finally{
        await databse.$disconnect()
    }
}

main();