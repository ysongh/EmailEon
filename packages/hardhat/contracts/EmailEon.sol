//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract EmailEon {
  constructor() {}

  mapping(address => Email[]) public emails;

  struct Email {
    string storeId;
    string secretName;
  }

  function getEmails(address _owner) public view returns (Email[] memory){
    return emails[_owner];
  }

  function addEmail(string memory _storeId, string memory _secretName) public {
    emails[msg.sender].push(Email(_storeId, _secretName));
  }
}
