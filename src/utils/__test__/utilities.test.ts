import { selectFields, omitFileds } from "../utilities";

const testedObj = {
  name: "zakaria",
  email: "zakaria@gmail.com",
  password: "password",
  role: "admin",
};

describe("selectField", () => {
  it("should return all fields of givin property array", () => {
    const newObj = selectFields(testedObj, [
      "name",
      "email",
      "password",
      "role",
    ]);

    expect(newObj).toMatchObject(testedObj);
  });
  it("should return only specified fields of givin property array", () => {
    const newObj = selectFields(testedObj, ["name", "email"]);

    expect(newObj).toMatchObject({
      name: "zakaria",
      email: "zakaria@gmail.com",
    });
  });
});

describe("omitFileds", () => {
  it("should return all fields without specified field", () => {
    const newObj = omitFileds(JSON.stringify(testedObj), ["role"]);

    expect(newObj).toMatchObject({
      name: "zakaria",
      email: "zakaria@gmail.com",
      password: "password",
    });
  });
});
