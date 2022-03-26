import { Model, PopulateOptions } from "mongoose";
import ApiFeatures from "../utils/ApiFeatures";
import { selectFields } from "./utilities";

type GetModelName<T> = {
  Model: Model<T>;
  isPlural?: boolean;
};

function getModelName<T>({ Model, isPlural }: GetModelName<T>): string {
  let modelName = Model.modelName;
  if (isPlural) {
    if (modelName.endsWith("y")) {
      return modelName.slice(0, -1).concat("ies").toLocaleLowerCase();
    }
    return modelName.concat("s").toLocaleLowerCase();
  }

  return modelName.toLowerCase();
}

type GetAll = {
  query: string;
  parentField?: string;
  parentId?: string;
};
/* 
   Get all functionality
*/
export const getAll =
  <T>(Model: Model<T>) =>
  async ({ query, parentField, parentId }: GetAll) => {
    // allow to get all childs related to a parent
    let filter = {};
    if (parentField && parentId) filter = { [parentField]: parentId };

    // create the query
    const features = new ApiFeatures(Model.find(filter), query)
      .filter()
      .limitingFields()
      .sorting()
      .pagination();

    //  fire the query
    const docs = await features.query;

    // return resource name with data to counsume those in controller ,
    // if err happen will handle in global error middleware
    return { resource: getModelName({ Model, isPlural: true }), data: docs };
  };

/* 
  Get One functionality
*/
type GetOne = {
  elementId: string;
  popOption?: PopulateOptions;
};
export const getOne =
  <T>(Model: Model<T>) =>
  async ({ elementId, popOption }: GetOne) => {
    // prepare the query
    const query = Model.findById(elementId);
    // add populate if its options exist
    if (popOption) query.populate(popOption);
    const doc = await query.select("-__v");
    if (!doc) {
      return { resource: getModelName({ Model }), data: null };
    }

    return { resource: getModelName({ Model }), data: doc };
  };

/* 
  Create One functionality
*/

type CreateOne = {
  selectedOption?: string[];
  body: object;
};
export const createOne =
  <T>(Model: Model<T>) =>
  async ({ selectedOption, body }: CreateOne) => {
    // prepare filterd body
    let filterdBody = body;
    // get specific fields to create
    if (selectedOption) filterdBody = selectFields(filterdBody, selectedOption);
    // create a new documetn
    const newDocument = await Model.create(filterdBody);
    return { resource: getModelName({ Model }), data: newDocument };
  };

/* 
  Update One functionality
*/

type UpdateOne = {
  elementId: string;
  body: object;
  selectedOption?: string[];
};

export const updateOne =
  <T>(Model: Model<T>) =>
  async ({ selectedOption, elementId, body }: UpdateOne) => {
    // prepare filterd object
    let filterdBody = body;
    if (selectedOption) filterdBody = selectFields(filterdBody, selectedOption);

    const updatedDocument = await Model.findByIdAndUpdate(
      elementId,
      filterdBody,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedDocument) {
      return { resource: getModelName({ Model }), data: null };
    }

    return { resource: getModelName({ Model }), data: updatedDocument };
  };

/* 
  Delete One functionality
*/

type DeleteOne = {
  elementId: string;
};
export const deleteOne =
  <T>(Model: Model<T>) =>
  async ({ elementId }: DeleteOne) => {
    const deletedDocument = await Model.findByIdAndDelete(elementId);
    if (!deletedDocument)
      return { resource: getModelName({ Model }), data: null };
    return { resource: getModelName({ Model }), data: deletedDocument };
  };
