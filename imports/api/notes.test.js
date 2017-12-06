import expect from 'expect';
import {Notes} from './notes';

if(Meteor.isServer){
  describe('notes',function(){
    const note1 = {
      _id:'testNoteId1',
      title:'My Title',
      body:'My body for the note',
      updatedAt:0,
      userId:'testUserId1'
    }
    const note2 = {
      _id:'testNoteId2',
      title:'Different Title',
      body:'',
      updatedAt:0,
      userId:'testUserId2'
    }
    beforeEach(function(){
      //in test it uses a seperate database!
      Notes.remove({});
      Notes.insert(note1);
      Notes.insert(note2);
    });

    it("should insert new note",function () {
      //need to use brackets due to special character
      const userId = "1234";
      const _id = Meteor.server.method_handlers['notes.insert'].apply({userId});
      expect(Notes.findOne({_id,userId})).toBeTruthy();
    });

    it("should not insert new note if not authenticated",function(){
      expect(()=>{
        Meteor.server.method_handlers['notes.insert']();
      }).toThrow();
    });

    it("should remove note",function(){
      Meteor.server.method_handlers['notes.remove'].apply({userId:note1.userId},[note1._id]);
      expect(Notes.findOne({_id:note1._id})).toBeFalsy();
    });

    it("should not remove note if unathenticated",function () {
      expect(()=>Meteor.server.method_handlers['notes.remove'](note1._id)).toThrow();
    });

    it("should not remove note if invalid id",function () {
      Meteor.server.method_handlers['notes.remove'].apply({userId:note1.userId},["sdjkjskdj"]);
      expect(Notes.findOne({_id:note1._id})).toBeTruthy();
    });

    it("should update a note if authenticated",function(){
      const title = "This is an updated title";
      Meteor.server.method_handlers['notes.update'].apply({userId:note1.userId},[note1._id,{title}]);
      const notes = Notes.findOne({_id:note1._id,userId:note1.userId});
      expect(notes.title).toBe("This is an updated title");
      expect(notes.updatedAt).toBeGreaterThan(0);
      expect(notes).toMatch({
        title,
        body:note1.body
      });
    });

    it("should not update a note if unauthenticated",function(){
      expect(()=>Meteor.server.method_handlers['notes.update'].apply({},[note1._id,{title}])).toThrow();
    });

    it("should not allow you to update a note if an invalid object is passed",function(){
      expect(()=>Meteor.server.method_handlers['notes.update'].apply({userId:note1.userId},[note1._id,{title:{},body:{}}])).toThrow();
      expect(()=>Meteor.server.method_handlers['notes.update'].apply({userId:note1.userId},[note1._id,{title:"hi",body:"its me",hack:{}}])).toThrow();
      expect(()=>Meteor.server.method_handlers['notes.update'].apply({userId:note1.userId},[note1._id,{body:{}}])).toThrow();
      expect(()=>Meteor.server.method_handlers['notes.update'].apply({userId:note1.userId},[note1._id,{test:1}])).toThrow();

    });

    it('should return a users notes - checking the publication',function(){
      const res = Meteor.server.publish_handlers.notes.apply({userId:note1.userId});
      const notes = res.fetch();
      expect(notes.length).toBe(1);
      expect(notes[0]).toEqual(note1);
    });
    it('should return 0 notes for a user who doesnt have any',function(){
      const res = Meteor.server.publish_handlers.notes.apply({userId:"madeupid"});
      const notes = res.fetch();
      expect(notes.length).toBe(0);
    });
  });
};
