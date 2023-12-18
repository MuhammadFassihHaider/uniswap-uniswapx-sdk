"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExclusiveDutchOrderReactor__factory = void 0;
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "contract IPermit2",
                name: "_permit2",
                type: "address",
            },
            {
                internalType: "address",
                name: "_protocolFeeOwner",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [],
        name: "DeadlineBeforeEndTime",
        type: "error",
    },
    {
        inputs: [],
        name: "DeadlinePassed",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "duplicateToken",
                type: "address",
            },
        ],
        name: "DuplicateFeeOutput",
        type: "error",
    },
    {
        inputs: [],
        name: "EndTimeBeforeStartTime",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "token",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "recipient",
                type: "address",
            },
        ],
        name: "FeeTooLarge",
        type: "error",
    },
    {
        inputs: [],
        name: "IncorrectAmounts",
        type: "error",
    },
    {
        inputs: [],
        name: "InputAndOutputDecay",
        type: "error",
    },
    {
        inputs: [],
        name: "InsufficientEth",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "feeToken",
                type: "address",
            },
        ],
        name: "InvalidFeeToken",
        type: "error",
    },
    {
        inputs: [],
        name: "InvalidReactor",
        type: "error",
    },
    {
        inputs: [],
        name: "NativeTransferFailed",
        type: "error",
    },
    {
        inputs: [],
        name: "NoExclusiveOverride",
        type: "error",
    },
    {
        inputs: [],
        name: "OrderEndTimeBeforeStartTime",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "orderHash",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "filler",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "swapper",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "nonce",
                type: "uint256",
            },
        ],
        name: "Fill",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "user",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "oldFeeController",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "newFeeController",
                type: "address",
            },
        ],
        name: "ProtocolFeeControllerSet",
        type: "event",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "bytes",
                        name: "order",
                        type: "bytes",
                    },
                    {
                        internalType: "bytes",
                        name: "sig",
                        type: "bytes",
                    },
                ],
                internalType: "struct SignedOrder",
                name: "order",
                type: "tuple",
            },
        ],
        name: "execute",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "bytes",
                        name: "order",
                        type: "bytes",
                    },
                    {
                        internalType: "bytes",
                        name: "sig",
                        type: "bytes",
                    },
                ],
                internalType: "struct SignedOrder[]",
                name: "orders",
                type: "tuple[]",
            },
        ],
        name: "executeBatch",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "bytes",
                        name: "order",
                        type: "bytes",
                    },
                    {
                        internalType: "bytes",
                        name: "sig",
                        type: "bytes",
                    },
                ],
                internalType: "struct SignedOrder[]",
                name: "orders",
                type: "tuple[]",
            },
            {
                internalType: "bytes",
                name: "callbackData",
                type: "bytes",
            },
        ],
        name: "executeBatchWithCallback",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "bytes",
                        name: "order",
                        type: "bytes",
                    },
                    {
                        internalType: "bytes",
                        name: "sig",
                        type: "bytes",
                    },
                ],
                internalType: "struct SignedOrder",
                name: "order",
                type: "tuple",
            },
            {
                internalType: "bytes",
                name: "callbackData",
                type: "bytes",
            },
        ],
        name: "executeWithCallback",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [],
        name: "feeController",
        outputs: [
            {
                internalType: "contract IProtocolFeeController",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "permit2",
        outputs: [
            {
                internalType: "contract IPermit2",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_newFeeController",
                type: "address",
            },
        ],
        name: "setProtocolFeeController",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        stateMutability: "payable",
        type: "receive",
    },
];
const _bytecode = "0x60a06040523480156200001157600080fd5b5060405162003136380380620031368339810160408190526200003491620000b8565b600080546001600160a01b0319166001600160a01b03831690811782556040518492849283928392907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a350506001600255506001600160a01b031660805250620000f79050565b6001600160a01b0381168114620000b557600080fd5b50565b60008060408385031215620000cc57600080fd5b8251620000d9816200009f565b6020840151909250620000ec816200009f565b809150509250929050565b60805161301d620001196000396000818160e0015261191b015261301d6000f3fe60806040526004361061009a5760003560e01c80632d771389116100695780636999b3771161004e5780636999b377146101715780638da5cb5b1461019e578063f2fde38b146101cb57600080fd5b80632d7713891461013e5780633f62192e1461015e57600080fd5b80630d335884146100a65780630d7a16c3146100bb57806312261ee7146100ce57806313fb72c71461012b57600080fd5b366100a157005b600080fd5b6100b96100b4366004612281565b6101eb565b005b6100b96100c936600461232f565b610364565b3480156100da57600080fd5b506101027f000000000000000000000000000000000000000000000000000000000000000081565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390f35b6100b9610139366004612371565b6104c5565b34801561014a57600080fd5b506100b961015936600461240f565b610683565b6100b961016c366004612433565b61078f565b34801561017d57600080fd5b506001546101029073ffffffffffffffffffffffffffffffffffffffff1681565b3480156101aa57600080fd5b506000546101029073ffffffffffffffffffffffffffffffffffffffff1681565b3480156101d757600080fd5b506100b96101e636600461240f565b610894565b6101f3610985565b604080516001808252818301909252600091816020015b6040805161016081018252600060a0820181815260c0830182905260e0830182905261010083018290526101208301829052606061014084018190529083528351808201855282815260208082018490528186018490528085019190915293830181905280830152608082015282527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff90920191018161020a5790505090506102b2846109f6565b816000815181106102c5576102c5612497565b60200260200101819052506102d981610b62565b6040517f585da628000000000000000000000000000000000000000000000000000000008152339063585da6289061031990849087908790600401612699565b600060405180830381600087803b15801561033357600080fd5b505af1158015610347573d6000803e3d6000fd5b5050505061035481610bb3565b5061035f6001600255565b505050565b61036c610985565b8060008167ffffffffffffffff81111561038857610388612468565b60405190808252806020026020018201604052801561044357816020015b6040805161016081018252600060a0820181815260c0830182905260e0830182905261010083018290526101208301829052606061014084018190529083528351808201855282815260208082018490528186018490528085019190915293830181905280830152608082015282527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9092019101816103a65790505b50905060005b828110156104a25761047d85858381811061046657610466612497565b9050602002810190610478919061275f565b6109f6565b82828151811061048f5761048f612497565b6020908102919091010152600101610449565b506104ac81610b62565b6104b581610bb3565b50506104c16001600255565b5050565b6104cd610985565b8260008167ffffffffffffffff8111156104e9576104e9612468565b6040519080825280602002602001820160405280156105a457816020015b6040805161016081018252600060a0820181815260c0830182905260e0830182905261010083018290526101208301829052606061014084018190529083528351808201855282815260208082018490528186018490528085019190915293830181905280830152608082015282527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9092019101816105075790505b50905060005b828110156105ec576105c787878381811061046657610466612497565b8282815181106105d9576105d9612497565b60209081029190910101526001016105aa565b506105f681610b62565b6040517f585da628000000000000000000000000000000000000000000000000000000008152339063585da6289061063690849088908890600401612699565b600060405180830381600087803b15801561065057600080fd5b505af1158015610664573d6000803e3d6000fd5b5050505061067181610bb3565b505061067d6001600255565b50505050565b60005473ffffffffffffffffffffffffffffffffffffffff163314610709576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600c60248201527f554e415554484f52495a4544000000000000000000000000000000000000000060448201526064015b60405180910390fd5b6001805473ffffffffffffffffffffffffffffffffffffffff8381167fffffffffffffffffffffffff000000000000000000000000000000000000000083168117909355604080519190921680825260208201939093527fb904ae9529e373e48bc82df4326cceaf1b4c472babf37f5b7dec46fecc6b53e0910160405180910390a15050565b610797610985565b604080516001808252818301909252600091816020015b6040805161016081018252600060a0820181815260c0830182905260e0830182905261010083018290526101208301829052606061014084018190529083528351808201855282815260208082018490528186018490528085019190915293830181905280830152608082015282527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9092019101816107ae579050509050610856826109f6565b8160008151811061086957610869612497565b602002602001018190525061087d81610b62565b61088681610bb3565b506108916001600255565b50565b60005473ffffffffffffffffffffffffffffffffffffffff163314610915576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600c60248201527f554e415554484f52495a454400000000000000000000000000000000000000006044820152606401610700565b600080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff83169081178255604051909133917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a350565b60028054036109f0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152606401610700565b60028055565b6040805161016081018252600060a0820181815260c0830182905260e083018290526101008301829052610120830182905260606101408401819052908352835180820185528281526020808201849052818601849052840152928201839052828201929092526080810182905290610a6f838061279d565b810190610a7c9190612b26565b9050610a8781610d06565b6040518060a0016040528082600001518152602001610abd836020015184604001518560a00151610e339092919063ffffffff16565b8152602001610ae3836020015184604001518560c00151610f059092919063ffffffff16565b8152602001848060200190610af8919061279d565b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250505090825250602001610b3b83610fec565b9052606082015160208301516080840151929450610b5c92859291906112be565b50919050565b805160005b8181101561035f576000838281518110610b8357610b83612497565b60200260200101519050610b9681611367565b610ba081336117e1565b610baa8133611919565b50600101610b67565b805160005b81811015610cf5576000838281518110610bd457610bd4612497565b602002602001015190506000816040015151905060005b81811015610c5557600083604001518281518110610c0b57610c0b612497565b60200260200101519050610c4c81604001518260200151836000015173ffffffffffffffffffffffffffffffffffffffff16611cac9092919063ffffffff16565b50600101610beb565b5081600001516020015173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16868581518110610c9e57610c9e612497565b6020026020010151608001517f78ad7ec0e9f89e74012afa58738b6b661c024cb0fd185ee2f616c0a28924bd66856000015160400151604051610ce391815260200190565b60405180910390a45050600101610bb8565b5047156104c1576104c13347611cf3565b60408101518151606001511015610d49576040517f773a618700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b806020015181604001511015610d8b576040517f48fee69c00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60a08101516040810151602090910151146108915760005b8160c00151518110156104c1578160c001518181518110610dc657610dc6612497565b6020026020010151604001518260c001518281518110610de857610de8612497565b60200260200101516020015114610e2b576040517fd303758b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600101610da3565b610e6d6040518060600160405280600073ffffffffffffffffffffffffffffffffffffffff16815260200160008152602001600081525090565b836040015184602001511115610eaf576040517f7c1f811300000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000610ec5856020015186604001518686611d92565b60408051606081018252875173ffffffffffffffffffffffffffffffffffffffff1681526020810192909252958601519581019590955250929392505050565b82516060908067ffffffffffffffff811115610f2357610f23612468565b604051908082528060200260200182016040528015610f8c57816020015b60408051606081018252600080825260208083018290529282015282527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff909201910181610f415790505b50915060005b81811015610fe357610fbe868281518110610faf57610faf612497565b60200260200101518686611e2c565b838281518110610fd057610fd0612497565b6020908102919091010152600101610f92565b50509392505050565b6040517f4578636c757369766544757463684f726465722800000000000000000000000060208201527f4f72646572496e666f20696e666f2c000000000000000000000000000000000060348201527f75696e74323536206465636179537461727454696d652c00000000000000000060438201527f75696e74323536206465636179456e6454696d652c0000000000000000000000605a8201527f61646472657373206578636c757369766546696c6c65722c0000000000000000606f8201527f75696e74323536206578636c757369766974794f766572726964654270732c0060878201527f6164647265737320696e707574546f6b656e2c0000000000000000000000000060a68201527f75696e7432353620696e7075745374617274416d6f756e742c0000000000000060b98201527f75696e7432353620696e707574456e64416d6f756e742c00000000000000000060d28201527f44757463684f75747075745b5d206f757470757473290000000000000000000060e982015260009060ff01604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0818403018152608083019091526052808352909190612edb60208301396040518060c00160405280608d8152602001612f5b608d91396040516020016111de93929190612bfa565b604051602081830303815290604052805190602001206112018360000151611efc565b83602001518460400151856060015186608001518760a00151600001518860a00151602001518960a001516040015161123d8b60c00151611f96565b60408051602081019b909b528a01989098526060890196909652608088019490945273ffffffffffffffffffffffffffffffffffffffff92831660a088015260c08701919091521660e0850152610100840152610120830152610140820152610160015b604051602081830303815290604052805190602001209050919050565b6112c88383612034565b61067d5780611303576040517fb9ec1e9600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b604084015160005b815181101561135f57600082828151811061132857611328612497565b60200260200101519050611351846127106113439190612c3d565b602083015190612710612081565b60209091015260010161130b565b505050505050565b60015473ffffffffffffffffffffffffffffffffffffffff166113875750565b6001546040517f8aa6cf0300000000000000000000000000000000000000000000000000000000815260009173ffffffffffffffffffffffffffffffffffffffff1690638aa6cf03906113de908590600401612c77565b600060405180830381865afa1580156113fb573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526114419190810190612c8a565b60408301515181519192509060006114598284612c3d565b67ffffffffffffffff81111561147157611471612468565b6040519080825280602002602001820160405280156114da57816020015b60408051606081018252600080825260208083018290529282015282527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff90920191018161148f5790505b50905060005b8381101561152b57856040015181815181106114fe576114fe612497565b602002602001015182828151811061151857611518612497565b60209081029190910101526001016114e0565b5060005b828110156117d257600085828151811061154b5761154b612497565b6020026020010151905060005b828110156116095786818151811061157257611572612497565b60200260200101516000015173ffffffffffffffffffffffffffffffffffffffff16826000015173ffffffffffffffffffffffffffffffffffffffff16036116015781516040517ffff0830300000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff9091166004820152602401610700565b600101611558565b506000805b8681101561168e5760008960400151828151811061162e5761162e612497565b60200260200101519050836000015173ffffffffffffffffffffffffffffffffffffffff16816000015173ffffffffffffffffffffffffffffffffffffffff16036116855760208101516116829084612c3d565b92505b5060010161160e565b50815160208901515173ffffffffffffffffffffffffffffffffffffffff9182169116036116cb5760208089015101516116c89082612c3d565b90505b806000036117205781516040517feddf07f500000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff9091166004820152602401610700565b61172e816005612710612081565b826020015111156117a1578151602083015160408085015190517f82e7565600000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff93841660048201526024810192909252919091166044820152606401610700565b81846117ad8589612c3d565b815181106117bd576117bd612497565b6020908102919091010152505060010161152f565b50604090940193909352505050565b81515173ffffffffffffffffffffffffffffffffffffffff163014611832576040517f4ddf4a6400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b815160600151421115611871576040517f70f65caa00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b81516080015173ffffffffffffffffffffffffffffffffffffffff16156104c1578151608001516040517f6e84ba2b00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff90911690636e84ba2b906118ed9084908690600401612d5a565b60006040518083038186803b15801561190557600080fd5b505afa15801561135f573d6000803e3d6000fd5b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663137c29fe6119d9846040805160a0810182526000606082018181526080830182905282526020820181905291810191909152506040805160a081018252602080840180515173ffffffffffffffffffffffffffffffffffffffff1660608085019182529151850151608085015283528451840151918301919091529251909201519082015290565b6040805180820182526000808252602091820152815180830190925273ffffffffffffffffffffffffffffffffffffffff8616825280870151810151908201528560000151602001518660800151604051806080016040528060528152602001612edb60529139604080517f4578636c757369766544757463684f726465722800000000000000000000000060208201527f4f72646572496e666f20696e666f2c000000000000000000000000000000000060348201527f75696e74323536206465636179537461727454696d652c00000000000000000060438201527f75696e74323536206465636179456e6454696d652c0000000000000000000000605a8201527f61646472657373206578636c757369766546696c6c65722c0000000000000000606f8201527f75696e74323536206578636c757369766974794f766572726964654270732c0060878201527f6164647265737320696e707574546f6b656e2c0000000000000000000000000060a68201527f75696e7432353620696e7075745374617274416d6f756e742c0000000000000060b98201527f75696e7432353620696e707574456e64416d6f756e742c00000000000000000060d28201527f44757463684f75747075745b5d206f757470757473290000000000000000000060e9820152815160df8183030181526101bf8201909252608d60ff820181815291612f5b9061011f01396040518060600160405280602e8152602001612f2d602e9139604051602001611c119493929190612d89565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529082905260608a01517fffffffff0000000000000000000000000000000000000000000000000000000060e089901b168352611c7e9695949392600401612e12565b600060405180830381600087803b158015611c9857600080fd5b505af115801561135f573d6000803e3d6000fd5b73ffffffffffffffffffffffffffffffffffffffff8316611cd15761035f8282611cf3565b61035f73ffffffffffffffffffffffffffffffffffffffff84163384846120bd565b60008273ffffffffffffffffffffffffffffffffffffffff1682611af490604051600060405180830381858888f193505050503d8060008114611d52576040519150601f19603f3d011682016040523d82523d6000602084013e611d57565b606091505b505090508061035f576040517ff4b3b1bc00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600082821015611dce576040517f4313345300000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b428211611ddc575082611e24565b428310611dea575083611e24565b4283900383830386861015611e0f57611e068688038383612081565b87039250611e21565b611e1c8787038383612081565b870192505b50505b949350505050565b6040805160608101825260008082526020820181905291810191909152836040015184602001511015611e8b576040517f7c1f811300000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000611ea1856020015186604001518686611d92565b90506040518060600160405280866000015173ffffffffffffffffffffffffffffffffffffffff168152602001828152602001866060015173ffffffffffffffffffffffffffffffffffffffff168152509150509392505050565b60006040518060c00160405280608d8152602001612f5b608d913980516020918201208351848301516040808701516060880151608089015160a08a015180519089012093516112a198939492939192910196875273ffffffffffffffffffffffffffffffffffffffff958616602088015293851660408701526060860192909252608085015290911660a083015260c082015260e00190565b600080825160200267ffffffffffffffff811115611fb657611fb6612468565b6040519080825280601f01601f191660200182016040528015611fe0576020820181803683370190505b50905060005b835181101561202557600061201385838151811061200657612006612497565b60200260200101516121af565b60208381028501015250600101611fe6565b50805160209091012092915050565b600073ffffffffffffffffffffffffffffffffffffffff8316158061205857508142115b80612078575073ffffffffffffffffffffffffffffffffffffffff831633145b90505b92915050565b6000827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04841183021582026120b657600080fd5b5091020490565b60006040517f23b872dd00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8516600482015273ffffffffffffffffffffffffffffffffffffffff841660248201528260448201526020600060648360008a5af13d15601f3d11600160005114161716915050806121a8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601460248201527f5452414e534645525f46524f4d5f4641494c45440000000000000000000000006044820152606401610700565b5050505050565b6000604051806080016040528060528152602001612edb605291398051602091820120835184830151604080870151606088015191516112a1969192910194855273ffffffffffffffffffffffffffffffffffffffff93841660208601526040850192909252606084015216608082015260a00190565b600060408284031215610b5c57600080fd5b60008083601f84011261224a57600080fd5b50813567ffffffffffffffff81111561226257600080fd5b60208301915083602082850101111561227a57600080fd5b9250929050565b60008060006040848603121561229657600080fd5b833567ffffffffffffffff808211156122ae57600080fd5b6122ba87838801612226565b945060208601359150808211156122d057600080fd5b506122dd86828701612238565b9497909650939450505050565b60008083601f8401126122fc57600080fd5b50813567ffffffffffffffff81111561231457600080fd5b6020830191508360208260051b850101111561227a57600080fd5b6000806020838503121561234257600080fd5b823567ffffffffffffffff81111561235957600080fd5b612365858286016122ea565b90969095509350505050565b6000806000806040858703121561238757600080fd5b843567ffffffffffffffff8082111561239f57600080fd5b6123ab888389016122ea565b909650945060208701359150808211156123c457600080fd5b506123d187828801612238565b95989497509550505050565b73ffffffffffffffffffffffffffffffffffffffff8116811461089157600080fd5b803561240a816123dd565b919050565b60006020828403121561242157600080fd5b813561242c816123dd565b9392505050565b60006020828403121561244557600080fd5b813567ffffffffffffffff81111561245c57600080fd5b611e2484828501612226565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60005b838110156124e15781810151838201526020016124c9565b50506000910152565b600081518084526125028160208601602086016124c6565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b600081518084526020808501945080840160005b83811015612593578151805173ffffffffffffffffffffffffffffffffffffffff908116895284820151858a0152604091820151169088015260609096019590820190600101612548565b509495945050505050565b6000815160e0845273ffffffffffffffffffffffffffffffffffffffff8082511660e08601528060208301511661010086015260408201516101208601526060820151610140860152806080830151166101608601525060a0810151905060c06101808501526126126101a08501826124ea565b905060208301516126506020860182805173ffffffffffffffffffffffffffffffffffffffff16825260208082015190830152604090810151910152565b50604083015184820360808601526126688282612534565b915050606083015184820360a086015261268282826124ea565b915050608083015160c08501528091505092915050565b6000604082016040835280865180835260608501915060608160051b8601019250602080890160005b8381101561270e577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa08887030185526126fc86835161259e565b955093820193908201906001016126c2565b5050858403818701528684528688828601376000848801820152601f9096017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169092019094019695505050505050565b600082357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc183360301811261279357600080fd5b9190910192915050565b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe18436030181126127d257600080fd5b83018035915067ffffffffffffffff8211156127ed57600080fd5b60200191503681900382131561227a57600080fd5b6040516060810167ffffffffffffffff8111828210171561282557612825612468565b60405290565b6040516080810167ffffffffffffffff8111828210171561282557612825612468565b60405160e0810167ffffffffffffffff8111828210171561282557612825612468565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff811182821017156128b8576128b8612468565b604052919050565b600082601f8301126128d157600080fd5b813567ffffffffffffffff8111156128eb576128eb612468565b61291c60207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f84011601612871565b81815284602083860101111561293157600080fd5b816020850160208301376000918101602001919091529392505050565b600060c0828403121561296057600080fd5b60405160c0810167ffffffffffffffff828210818311171561298457612984612468565b8160405282935084359150612998826123dd565b9082526020840135906129aa826123dd565b8160208401526040850135604084015260608501356060840152608085013591506129d4826123dd565b81608084015260a08501359150808211156129ee57600080fd5b506129fb858286016128c0565b60a0830152505092915050565b600060608284031215612a1a57600080fd5b612a22612802565b90508135612a2f816123dd565b80825250602082013560208201526040820135604082015292915050565b600067ffffffffffffffff821115612a6757612a67612468565b5060051b60200190565b600082601f830112612a8257600080fd5b81356020612a97612a9283612a4d565b612871565b82815260079290921b84018101918181019086841115612ab657600080fd5b8286015b84811015612b1b5760808189031215612ad35760008081fd5b612adb61282b565b8135612ae6816123dd565b8152818501358582015260408083013590820152606080830135612b09816123dd565b90820152835291830191608001612aba565b509695505050505050565b600060208284031215612b3857600080fd5b813567ffffffffffffffff80821115612b5057600080fd5b908301906101208286031215612b6557600080fd5b612b6d61284e565b823582811115612b7c57600080fd5b612b888782860161294e565b8252506020830135602082015260408301356040820152612bab606084016123ff565b606082015260808301356080820152612bc78660a08501612a08565b60a082015261010083013582811115612bdf57600080fd5b612beb87828601612a71565b60c08301525095945050505050565b60008451612c0c8184602089016124c6565b845190830190612c208183602089016124c6565b8451910190612c338183602088016124c6565b0195945050505050565b8082018082111561207b577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b602081526000612078602083018461259e565b60006020808385031215612c9d57600080fd5b825167ffffffffffffffff811115612cb457600080fd5b8301601f81018513612cc557600080fd5b8051612cd3612a9282612a4d565b81815260609182028301840191848201919088841115612cf257600080fd5b938501935b83851015612d4e5780858a031215612d0f5760008081fd5b612d17612802565b8551612d22816123dd565b81528587015187820152604080870151612d3b816123dd565b9082015283529384019391850191612cf7565b50979650505050505050565b73ffffffffffffffffffffffffffffffffffffffff83168152604060208201526000611e24604083018461259e565b7f4578636c757369766544757463684f72646572207769746e6573732900000000815260008551612dc181601c850160208a016124c6565b855190830190612dd881601c840160208a016124c6565b8551910190612dee81601c8401602089016124c6565b8451910190612e0481601c8401602088016124c6565b01601c019695505050505050565b6000610140612e42838a51805173ffffffffffffffffffffffffffffffffffffffff168252602090810151910152565b6020890151604084015260408901516060840152612e836080840189805173ffffffffffffffffffffffffffffffffffffffff168252602090810151910152565b73ffffffffffffffffffffffffffffffffffffffff871660c08401528560e084015280610100840152612eb8818401866124ea565b9050828103610120840152612ecd81856124ea565b999850505050505050505056fe44757463684f7574707574286164647265737320746f6b656e2c75696e74323536207374617274416d6f756e742c75696e7432353620656e64416d6f756e742c6164647265737320726563697069656e7429546f6b656e5065726d697373696f6e73286164647265737320746f6b656e2c75696e7432353620616d6f756e74294f72646572496e666f28616464726573732072656163746f722c6164647265737320737761707065722c75696e74323536206e6f6e63652c75696e7432353620646561646c696e652c61646472657373206164646974696f6e616c56616c69646174696f6e436f6e74726163742c6279746573206164646974696f6e616c56616c69646174696f6e4461746129a2646970667358221220895643e805129fd4ed4b9dbb76b8350150a9a20556a76ca1da49adf06223485b64736f6c63430008130033";
const isSuperArgs = (xs) => xs.length > 1;
class ExclusiveDutchOrderReactor__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    deploy(_permit2, _protocolFeeOwner, overrides) {
        return super.deploy(_permit2, _protocolFeeOwner, overrides || {});
    }
    getDeployTransaction(_permit2, _protocolFeeOwner, overrides) {
        return super.getDeployTransaction(_permit2, _protocolFeeOwner, overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.ExclusiveDutchOrderReactor__factory = ExclusiveDutchOrderReactor__factory;
ExclusiveDutchOrderReactor__factory.bytecode = _bytecode;
ExclusiveDutchOrderReactor__factory.abi = _abi;
//# sourceMappingURL=ExclusiveDutchOrderReactor__factory.js.map