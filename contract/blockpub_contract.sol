// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BlockPubContract is ERC721, ERC721URIStorage, Ownable {
    uint256 private nextTokenId;
    mapping(uint256 => address[]) private paymentMapping;//tokenId => array of payers address
    mapping(uint256 => uint256) private priceMapping; //tokenId => price

    event bookPublished(uint256 bookId, address publisherAddress, string metadata);
    event paymentMade(uint256 bookId, address payer);

    string private title;

    constructor(string memory publisherName, string memory ticker) ERC721(publisherName, ticker) {
        title = publisherName;
    }

    function publishBook(string memory bookMetadataUrl, uint256 price) public {
        priceMapping[nextTokenId] = price;
        _safeMint(msg.sender, nextTokenId);
        _setTokenURI(nextTokenId, bookMetadataUrl);

        emit bookPublished(nextTokenId, msg.sender, bookMetadataUrl);

        nextTokenId++;
    }

    function makePaymentToAuthor(address authorAddress, uint256 price, uint256 tokenId) public payable{
        //if value is less than price emit insufficient
        require(msg.value >= price, "Insufficient payment");

        (bool success,) = authorAddress.call{value: msg.value}("");

        require(success, "Payment transfer failed");

        emit paymentMade(tokenId, msg.sender);
        
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
