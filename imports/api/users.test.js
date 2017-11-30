import expect from 'expect';

import {validateNewUser} from './users';

describe("users",function(){
  it("should accept valid email",function(){
    var testUser = {emails:[{address:"andyrunciman@gmail.com"}]};
    var result = validateNewUser(testUser);
    expect(result).toBe(true);
  });
  it("should reject valid email",function(){
    var testUser = {emails:[{address:"andyruncimangmail.com"}]};
    expect(()=>{validateNewUser(testUser)}).toThrow();
  });
});
