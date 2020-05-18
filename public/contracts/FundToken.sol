// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.6.8;

contract FundToken {

    uint8 public constant decimals = 18;  


    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
    event Transfer(address indexed from, address indexed to, uint tokens);


    mapping(address => uint256) balances;

    mapping(address => mapping (address => uint256)) allowed;
    
    string public name = "";
    string public cusipNo = "";
    string public emmaId = "";
    uint256 public maturityDate;
    uint256 public coupon;
    uint256 public principal;
    
    uint256 totalSupply_;

    using SafeMath for uint256;


   constructor (string memory _name,
                string memory _cusipNo,
                string memory _emmaId,
                uint256 _maturityDate,
                uint256 _principal,
                uint256 _coupon,
                uint256 totalSupply) public {
    name = _name;
    cusipNo = _cusipNo;
    emmaId = _emmaId;
    maturityDate = _maturityDate;
    principal = _principal;
    coupon = _coupon;
    totalSupply_ = totalSupply;
  balances[msg.sender] = totalSupply_;
    }  

    function totalSupply() public view returns (uint256) {
  return totalSupply_;
    }
    
    function balanceOf(address tokenOwner) public view returns (uint) {
        return balances[tokenOwner];
    }

    function transfer(address receiver, uint numTokens) public returns (bool) {
        require(numTokens <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender].sub(numTokens);
        balances[receiver] = balances[receiver].add(numTokens);
        emit Transfer(msg.sender, receiver, numTokens);
        return true;
    }

    function approve(address delegate, uint numTokens) public returns (bool) {
        allowed[msg.sender][delegate] = numTokens;
        emit Approval(msg.sender, delegate, numTokens);
        return true;
    }

    function allowance(address owner, address delegate) public view returns (uint) {
        return allowed[owner][delegate];
    }

    function transferFrom(address owner, address buyer, uint numTokens) public returns (bool) {
        require(numTokens <= balances[owner]);    
        require(numTokens <= allowed[owner][msg.sender]);
    
        balances[owner] = balances[owner].sub(numTokens);
        allowed[owner][msg.sender] = allowed[owner][msg.sender].sub(numTokens);
        balances[buyer] = balances[buyer].add(numTokens);
        emit Transfer(owner, buyer, numTokens);
        return true;
    }
}

library SafeMath { 
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
      assert(b <= a);
      return a - b;
    }
    
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
      uint256 c = a + b;
      assert(c >= a);
      return c;
    }
}