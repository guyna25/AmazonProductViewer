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

    validate_is_JSON(tested_str) {
        if (typeof tested_str != 'string') {
            tested_str = JSON.stringify(tested_str);
        };
        try {
            JSON.parse(tested_str);
        } catch (e) {
            console.log(e);
            this.throw_mismatch_type_error(tested_str.constructor, JSON)
        }
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

    createOne(data, callback_func=null) {
        let callback_function = callback_func ? callback_func : function() {
            console.log(`Saved ${data} succesfully`);
        };
        this.check_abstract(this.abstract_method_error_msg);
        this.validate_is_JSON(data);
        this.collection(data).save().then(callback_function);
    };
    
    createMany(data, callback_func=null) {
        let collection_name = this.collection.collection.collectionName;
        collection_name = collection_name.charAt(0).toUpperCase() + collection_name.slice(1, -1);
        let callback_function = callback_func ? callback_func : function() {
            console.log(`Succesfully saved ${data.length} documents of collection ${collection_name}.`);
        };
        this.check_abstract(this.abstract_method_error_msg);
        this.validate_type(data, Array);
        
        return this.collection(data).save().then(callback_function);
    };

    readOne(filter){
        this.check_abstract(this.abstract_method_error_msg);
        this.validate_is_JSON(data);
        return this.collection.findOne(filter); 
    };

    readMany(filter){
        this.check_abstract(this.abstract_method_error_msg);
        this.validate_is_JSON(filter);
        return this.collection.find(filter);
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