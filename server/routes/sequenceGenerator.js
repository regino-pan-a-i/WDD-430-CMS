var Sequence = require('../models/sequence');

var maxDocumentId;
var maxMessageId;
var maxContactId;
var sequenceId = null;

function SequenceGenerator() {

  Sequence.findOne().then((sequence)=>{
    if (sequence) {
      sequenceId = sequence._id;
      maxDocumentId = sequence.maxDocumentId;
      maxMessageId = sequence.maxMessageId;
      maxContactId = sequence.maxContactId;
    } else {
      console.log('No sequence found in database');
    }
  }).catch(error => {
    console.log('An error occurred loading sequence:', error);
  });
}

SequenceGenerator.prototype.nextId = function(collectionType) {

  var updateObject = {};
  var nextId;

  switch (collectionType) {
    case 'documents':
      maxDocumentId++;
      updateObject = {maxDocumentId: maxDocumentId};
      nextId = maxDocumentId;
      break;
    case 'messages':
      maxMessageId++;
      updateObject = {maxMessageId: maxMessageId};
      nextId = maxMessageId;
      break;
    case 'contacts':
      maxContactId++;
      updateObject = {maxContactId: maxContactId};
      nextId = maxContactId;
      break;
    default:
      return -1;
  }

  Sequence.findOneAndUpdate(
    {_id: sequenceId}, 
    {$set: updateObject},
    {new: true}
  ).then((updatedSequence) => {
    console.log('Sequence updated successfully');
  }).catch((err) => {
    console.log("nextId error = " + err);
  });

  return nextId;
}

module.exports = new SequenceGenerator();
