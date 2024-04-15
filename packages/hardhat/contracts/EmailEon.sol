//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract EmailEon {
  constructor() {}

  mapping(address => Email[]) public emails;
  mapping(address => Profile) public profiles;
  mapping(address => bool) public hasProfile;

  struct Email {
    string storeId;
    string secretName;
  }

  struct Profile {
    address owner;
    string email;
  }

  function getEmails(address _owner) public view returns (Email[] memory){
    return emails[_owner];
  }

  function addEmail(string memory _storeId, string memory _secretName) public {
    emails[msg.sender].push(Email(_storeId, _secretName));
  }

  function getHasProfile(address _owner) public view returns (bool){
    return hasProfile[_owner];
  }
  
  function getProfile(address _owner) public view returns (Profile memory){
    return profiles[_owner];
  }

  function createProfile(string memory _email) public {
    profiles[msg.sender] = Profile(msg.sender, _email);
    hasProfile[msg.sender] = true;
  }
}
