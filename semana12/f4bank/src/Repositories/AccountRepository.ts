import { IUserAccount } from "../Types/Types";
import { v4 } from "uuid";
import moment from "moment";
import fs from "fs";

class AccountRepositories {
    private async queryDatabase(): Promise<IUserAccount[]> {
        return JSON.parse(
            fs.readFileSync(__dirname + "/../Database/database.json").toString()
        );
    }

    private async insertInDatabase(data: IUserAccount[]) {
        fs.writeFileSync(
            __dirname + "/../Database/database.json",
            JSON.stringify(data, null, 2)
        );
    }

    private async queryDataBaseAndcheckAccountExistence(CPF: string) {
        const dbQuery = await this.queryDatabase();
        const accountIndex = dbQuery.findIndex(
            (Account: IUserAccount) => Account.CPF === CPF
        );

        return accountIndex;
    }

    async queryDataBaseAndCreateAccount(schema: IUserAccount) {
        const dbQuery = await this.queryDatabase();
        const accountIndex = await this.queryDataBaseAndcheckAccountExistence(
            schema.CPF
        );

        if (accountIndex === -1) {
            dbQuery.push(schema);

            await this.insertInDatabase(dbQuery);
            console.log("Conta criada com sucesso");
        } else {
            throw new Error("O CPF já está cadastrado na base de dados");
        }
    }

    async queryDatabaseForUserBalance(CPF: string) {
        const dbQuery = await this.queryDatabase();
        const accountIndex = await this.queryDataBaseAndcheckAccountExistence(
            CPF
        );

        if (accountIndex !== -1) {
            console.log(
                `Olá, ${dbQuery[accountIndex].name} seu saldo é ${dbQuery[accountIndex].balance}`
            );
        } else {
            throw new Error("CPF não encontrado na base de dados");
        }
    }

    async queryDatabaseForDeposit(CPF: string, amount: number) {
        const dbQuery = await this.queryDatabase();
        const accountIndex = await this.queryDataBaseAndcheckAccountExistence(
            CPF
        );

        if (accountIndex !== -1) {
            dbQuery[accountIndex] = {
                ...dbQuery[accountIndex],
                balance: dbQuery[accountIndex].balance + amount,
            };

            await this.insertInDatabase(dbQuery);

            console.log(
                `Olá, ${dbQuery[accountIndex].name} seu novo saldo é R$ ${dbQuery[accountIndex].balance}`
            );
        } else {
            throw new Error("CPF não encontrado na base de dados");
        }
    }

    async queryDatabaseAndMakeTransaction(
        CPF: string,
        value: number,
        description: string,
        date: string | undefined,
        type: "payment" | "transference",
        CPF2 = "Destination_CPF"
    ) {
        const dbQuery = await this.queryDatabase();
        const accountIndex = await this.queryDataBaseAndcheckAccountExistence(
            CPF
        );
        const accountIndex_destination = await this.queryDataBaseAndcheckAccountExistence(
            CPF2
        );

        if (
            accountIndex !== -1 &&
            dbQuery[accountIndex].balance >= value &&
            accountIndex_destination !== -1 &&
            (moment(date, "DD/MM/YYYY").isBefore(moment()) ||
                moment(date, "DD/MM/YYYY").isSame(moment()))
        ) {
            switch (type) {
                case "payment":
                    dbQuery[accountIndex] = {
                        ...dbQuery[accountIndex],
                        balance: dbQuery[accountIndex].balance - value,
                        history: [
                            ...dbQuery[accountIndex].history,
                            {
                                id: v4(),
                                amount: value,
                                date: date ? date : String(Date.now()),
                                description: description,
                            },
                        ],
                    };

                    console.log("Conta paga com sucesso!");
                    this.insertInDatabase(dbQuery);
                    break;
                case "transference":
                    dbQuery[accountIndex] = {
                        ...dbQuery[accountIndex],
                        balance: dbQuery[accountIndex].balance - value,
                        history: [
                            ...dbQuery[accountIndex].history,
                            {
                                id: v4(),
                                amount: value,
                                date: date ? date : String(Date.now()),
                                description: description,
                            },
                        ],
                    };

                    dbQuery[accountIndex_destination] = {
                        ...dbQuery[accountIndex_destination],
                        balance:
                            dbQuery[accountIndex_destination].balance - value,
                        history: [
                            ...dbQuery[accountIndex_destination].history,
                            {
                                id: v4(),
                                amount: value,
                                date: date ? date : String(Date.now()),
                                description: `Transferência recebida de ${dbQuery[accountIndex].name}`,
                            },
                        ],
                    };
                    console.log(
                        `Transferência para ${dbQuery[accountIndex_destination].name} concluída com sucesso`
                    );
                    this.insertInDatabase(dbQuery);
                    break;
                default:
                    throw new Error("Transação não suportada");
            }
        } else {
            throw new Error(
                "CPF não encontrado ou saldo insuficiente; certifique-se também se a data é a atual ou anterior ao dia de hoje"
            );
        }
    }
}

export default new AccountRepositories();

console.log();
