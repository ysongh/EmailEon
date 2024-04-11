//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract EmailEon {
  constructor() {}

  Email[] emails;

  struct Email {
    string storeId;
    string secretName;
  }

  function getEmails() public view returns (Email[] memory){
    return emails;
  }

  function addEmail(string memory _storeId, string memory _secretName) public {
    emails.push(Email(_storeId, _secretName));
  }
}
