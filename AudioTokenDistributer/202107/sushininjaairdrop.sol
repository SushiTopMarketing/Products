// SPDX-License-Identifier: NONE

pragma solidity ^0.8.0;

import "./OpenzeppelinERC721.sol";

contract sushininja1 is  ERC721URIStorage , ERC721Enumerable {

    address public owner;
    uint nftid = 1;
    
    string currentURI = "https://arweave.net/BHgLoOk76jj9xaqHV-smswfm6EFzGqWAiyJogIL4aZk";
    address airdropperaddress = 0x08Be0EB2345a54454FDD19ED5E01391914f721A1;

    event Mint();
    event SetTokenURI( uint256 , string );

    function setTokenURI( uint targetnftid ,string memory _uri ) public {
        require( _msgSender() == owner );
        //ipfs://Qm....... or https://arweave.net/......  etc.
        _setTokenURI( targetnftid , _uri );
        emit SetTokenURI( targetnftid , _uri );
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }


    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function burn(uint256 _id) public {
        require( _msgSender() == ownerOf(_id));
        _burn(_id);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        
        if ( keccak256(abi.encodePacked(super.tokenURI(tokenId))) != keccak256(abi.encodePacked(""))){
        return super.tokenURI(tokenId);
        } else {
        return currentURI;
        }
    }


    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function airdrop(address _userAddress) public {
        require( _msgSender() == airdropperaddress );
        require( nftid <= 150 );
        _safeMint( _userAddress , nftid);
        emit Mint();
        nftid++;
    }


    constructor() ERC721("STS_sushininja_1" , "STSNINJ1" ) {
        owner = airdropperaddress;
        
        }
    
} 
