class Model {
    
    constructor(collection) {
        this.check_abstract("Abstract classes can't be instantiated.");
        this.abstract_method_error_msg = "Abstract methods can't be called.";
        this.collection = collection;
    };

    //Helper functions
    
    check_abstract (msg) {
        if (this.constructor == Model) {
            throw new Error(msg);
        }
    };

    validate_is_JSON(data) {
        var testIfJson = JSON.parse(data);
        if (typeof testIfJson !== "object"){
            //Json
            throw_wrong_arg_number_error_msg(1, data.length);
        };
    };

    validate_type(data, wanted_type) {
        if (data.constructor !== wanted_type) {
            //Json
            this.throw_mismatch_type_error(data.constructor, wanted_type);
        };
    };

    throw_wrong_arg_number_error(wanted, given) {
        throw new Error(`Requested number of arguments is ${wanted}, but ${given} were given.`);
    };

    throw_mismatch_type_error(wanted, given) {
        throw new Error(`The wanted type is ${wanted}, but ${given} was given.`);
    };

    createOne(data){
        this.check_abstract(this.abstract_method_error_msg);
        this.validate_is_JSON(data);
        this.collection(data).save().then(() => console.log(`Saved ${data} succesfully`));
    };
    
    createMany(data){
        this.check_abstract(this.abstract_method_error_msg);
        this.validate_type(data, Array);
        let collection_name = this.collection.collection.collectionName;
        collection_name = collection_name.charAt(0).toUpperCase() + collection_name.slice(1, -1);
        return this.collection(data).save().then(() => console.log(`Succesfully saved ${data.length} documents of collection ${collection_name}.`));
    };

    readOne(data){
        this.check_abstract(this.abstract_method_error_msg);
        this.validate_is_JSON(data);
        return this.collection.find(data); //TODO handle case with more than one result
    };

    readMany(data){
        this.check_abstract(this.abstract_method_error_msg);
        this.validate_type(data, Array);
        return this.collection.find(data);
    };

    updateOne(data, filter) {
        this.check_abstract(this.abstract_method_error_msg);
        this.validate_is_JSON(data);
        return this.collection.update(filter, data);
    };

    updateMany(data, filter) {
        this.check_abstract(this.abstract_method_error_msg);
        this.validate_type(data, Array);
        return this.collection.updateOne(filter, data);
    };

    deleteOne(data) {
        this.check_abstract(this.abstract_method_error_msg);
        this.validate_is_JSON(data);
        return this.collection.deleteOne(data);
    };

    deleteMany(data) {
        this.check_abstract(this.abstract_method_error_msg);
        this.validate_type(data, Array);
        return this.collection.deleteMany(data);
    };

};

module.exports = {
    Model,
};