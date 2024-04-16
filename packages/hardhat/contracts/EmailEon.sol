//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract EmailEon {
  constructor() {}

  mapping(address => Email[]) public emails;
  mapping(address => Profile) public profiles;
  mapping(address => bool) public hasProfile;
  mapping(address => string[]) public subscribeTo;

  struct Email {
    string storeId;
    string secretName;
  }

  struct Profile {
    address owner;
    string email;
    string userID;
  }

  function getEmails(address _owner) public view returns (Email[] memory){
    return emails[_owner];
  }

  function getHasProfile(address _owner) public view returns (bool){
    return hasProfile[_owner];
  }
  
  function getProfile(address _owner) public view returns (Profile memory){
    return profiles[_owner];
  }

  function getSubscribeTo(address _owner) public view returns (string[] memory){
    return subscribeTo[_owner];
  }

  function addEmail(address _owner, string memory _storeId, string memory _secretName) public {
    emails[msg.sender].push(Email(_storeId, _secretName));
    subscribeTo[msg.sender].push(profiles[_owner].email);
  }

  function createProfile(string memory _email, string memory _userID) public {
    profiles[msg.sender] = Profile(msg.sender, _email, _userID);
    hasProfile[msg.sender] = true;
  }
}
