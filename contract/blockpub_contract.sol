// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BlockPubContract is ERC721, ERC721URIStorage, Ownable {
    uint256 private nextTokenId;
    mapping(uint256 => address[]) private paymentMapping;//tokenId => array of payers address
    mapping(uint256 => uint256) private priceMapping; //tokenId => price

    string private title;

    constructor(string memory publisherName, string memory ticker) ERC721(publisherName, ticker) {
        title = publisherName;
    }

    function publishBook(string memory bookMetadataUrl, uint256 price) public {
        priceMapping[nextTokenId] = price;
        _safeMint(msg.sender, nextTokenId);
        _setTokenURI(nextTokenId, bookMetadataUrl);

        nextTokenId++;
    }

    function makePaymentToAuthor(address authorAddress, uint256 price, uint256 tokenId) public payable{
        //if value is less than price emit insufficient
        require(msg.value >= price, "Insufficient payment");

        (bool success,) = authorAddress.call{value: msg.value}("");

        require(success, "Payment transfer failed");
        
        recordPayment(tokenId, msg.sender);
    }

    function getTokenPaymentMap(uint256 tokenId) public view returns (address[] memory) {
        return paymentMapping[tokenId];
    }
    
    function recordPayment(uint256 tokenId, address addr) private {
        if (paymentMapping[tokenId].length == 0) {
            // If the array doesn't exist, add the value as a new array
            paymentMapping[tokenId] = [addr];
        } else {
            // If the array already exists, add the value to it
            paymentMapping[tokenId].push(addr);
        }
    }

    function getPrice(uint256 tokenId) public view returns (uint256) {
        return priceMapping[tokenId];
    }

    function _baseURI() internal pure override returns (string memory) {
        return "";//returns empty string. token uri will contain full url already
    }

    // The following functions are overrides required by Solidity.
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}






// First cntract that wasn't used




// SPDX-License-Identifier: MIT
// pragma solidity ^0.8.9;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

// contract BlockPubContract is ERC721, ERC721URIStorage, Ownable {
//     uint256 public nextTokenId;
//     mapping(address => bool) private _hasMinted;

//     string public bookTitle;
//     string public author;
//     string public coverImageUrl;
//     string private _bookUrl;
//     uint256 private _price;

//     constructor(string memory title, string memory authorName, string memory cIU, string memory bU, uint256 price) ERC721(bookTitle, "BLKP") {
//         bookTitle = title;
//         author = authorName;
//         coverImageUrl = cIU;
//         _bookUrl = bU;
//         _price = price; //in wei
//     }

//     function _baseURI() internal pure override returns (string memory) {
//         return "https://baseUri";
//     }

//     // The following functions are overrides required by Solidity.
//     function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
//         super._burn(tokenId);
//     }

//     function tokenURI(uint256 tokenId)
//         public
//         view
//         override(ERC721, ERC721URIStorage)
//         returns (string memory)
//     {
//         return super.tokenURI(tokenId);
//     }

//     function purchaseBook(address to) public payable {
//         require(!_hasMinted[msg.sender], "You have already minted");
//         require(msg.value >= _price, "Insufficient payment");

//         _safeMint(to, nextTokenId);
//         _setTokenURI(nextTokenId, coverImageUrl);
//         _hasMinted[msg.sender] = true;

//         nextTokenId++;

//         address payable owner = payable(owner());
//         owner.transfer(msg.value);
//     }

//     function accessBook() public view returns (string memory) {
//         //require user to have paid
//         //require(_hasMinted[msg.sender], "You don't have access to this book");

//         return _bookUrl;
//     }

//     function getPrice() public view returns (uint256) {
//         return _price;
//     }

//     // function update_BookUrl(string newUrl) public onlyOwner{
        
//     // }

//     // function updateBook_Price(uint256 new_Price) public onlyOwner{ 
        
//     // }
// }
