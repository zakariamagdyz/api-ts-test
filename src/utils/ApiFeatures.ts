export default class ApiFeatures {
  constructor(public query: any, private queryString: any) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // Exclude some fields from our query
    let queryStringClone = { ...this.queryString };
    ["sort", "page", "fields", "limit"].forEach(
      (query) => delete queryStringClone[query]
    );

    // add operators to the query so we can query by fields & operators
    let queryStr = JSON.stringify(queryStringClone);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  sorting() {
    if (this.queryString.sort) {
      const sortFields = this.queryString.sort.splite(",").join(" ");
      this.query = this.query.sort(sortFields);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  limitingFields() {
    if (this.queryString.fields) {
      const selectedFields = this.queryString.fields.splite(",").join(" ");
      this.query = this.query.select(selectedFields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }
  pagination() {
    const page = this.queryString.page || 1;
    const limit = this.queryString.limit || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}
