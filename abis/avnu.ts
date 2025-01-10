export const avnu = [
  {
    name: "ExchangeLocker",
    type: "impl",
    interface_name: "avnu::interfaces::locker::ILocker",
  },
  {
    name: "avnu::interfaces::locker::ILocker",
    type: "interface",
    items: [
      {
        name: "locked",
        type: "function",
        inputs: [
          {
            name: "id",
            type: "core::integer::u32",
          },
          {
            name: "data",
            type: "core::array::Array::<core::felt252>",
          },
        ],
        outputs: [
          {
            type: "core::array::Array::<core::felt252>",
          },
        ],
        state_mutability: "external",
      },
    ],
  },
  {
    name: "Exchange",
    type: "impl",
    interface_name: "avnu::exchange::IExchange",
  },
  {
    name: "core::bool",
    type: "enum",
    variants: [
      {
        name: "False",
        type: "()",
      },
      {
        name: "True",
        type: "()",
      },
    ],
  },
  {
    name: "core::integer::u256",
    type: "struct",
    members: [
      {
        name: "low",
        type: "core::integer::u128",
      },
      {
        name: "high",
        type: "core::integer::u128",
      },
    ],
  },
  {
    name: "avnu::models::Route",
    type: "struct",
    members: [
      {
        name: "token_from",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "token_to",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "exchange_address",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "percent",
        type: "core::integer::u128",
      },
      {
        name: "additional_swap_params",
        type: "core::array::Array::<core::felt252>",
      },
    ],
  },
  {
    name: "avnu::exchange::IExchange",
    type: "interface",
    items: [
      {
        name: "get_owner",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "transfer_ownership",
        type: "function",
        inputs: [
          {
            name: "new_owner",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "external",
      },
      {
        name: "upgrade_class",
        type: "function",
        inputs: [
          {
            name: "new_class_hash",
            type: "core::starknet::class_hash::ClassHash",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "external",
      },
      {
        name: "get_adapter_class_hash",
        type: "function",
        inputs: [
          {
            name: "exchange_address",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::starknet::class_hash::ClassHash",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "set_adapter_class_hash",
        type: "function",
        inputs: [
          {
            name: "exchange_address",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "adapter_class_hash",
            type: "core::starknet::class_hash::ClassHash",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "external",
      },
      {
        name: "get_fees_active",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "set_fees_active",
        type: "function",
        inputs: [
          {
            name: "active",
            type: "core::bool",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "external",
      },
      {
        name: "get_fees_recipient",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "set_fees_recipient",
        type: "function",
        inputs: [
          {
            name: "recipient",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "external",
      },
      {
        name: "get_fees_bps_0",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u128",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "set_fees_bps_0",
        type: "function",
        inputs: [
          {
            name: "bps",
            type: "core::integer::u128",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "external",
      },
      {
        name: "get_fees_bps_1",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u128",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "set_fees_bps_1",
        type: "function",
        inputs: [
          {
            name: "bps",
            type: "core::integer::u128",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "external",
      },
      {
        name: "get_swap_exact_token_to_fees_bps",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u128",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "set_swap_exact_token_to_fees_bps",
        type: "function",
        inputs: [
          {
            name: "bps",
            type: "core::integer::u128",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "external",
      },
      {
        name: "multi_route_swap",
        type: "function",
        inputs: [
          {
            name: "token_from_address",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "token_from_amount",
            type: "core::integer::u256",
          },
          {
            name: "token_to_address",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "token_to_amount",
            type: "core::integer::u256",
          },
          {
            name: "token_to_min_amount",
            type: "core::integer::u256",
          },
          {
            name: "beneficiary",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "integrator_fee_amount_bps",
            type: "core::integer::u128",
          },
          {
            name: "integrator_fee_recipient",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "routes",
            type: "core::array::Array::<avnu::models::Route>",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "external",
      },
      {
        name: "swap_exact_token_to",
        type: "function",
        inputs: [
          {
            name: "token_from_address",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "token_from_amount",
            type: "core::integer::u256",
          },
          {
            name: "token_from_max_amount",
            type: "core::integer::u256",
          },
          {
            name: "token_to_address",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "token_to_amount",
            type: "core::integer::u256",
          },
          {
            name: "beneficiary",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "routes",
            type: "core::array::Array::<avnu::models::Route>",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "external",
      },
    ],
  },
  {
    name: "constructor",
    type: "constructor",
    inputs: [
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "fee_recipient",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
  },
  {
    kind: "struct",
    name: "avnu::exchange::Exchange::Swap",
    type: "event",
    members: [
      {
        kind: "data",
        name: "taker_address",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "sell_address",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "sell_amount",
        type: "core::integer::u256",
      },
      {
        kind: "data",
        name: "buy_address",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "buy_amount",
        type: "core::integer::u256",
      },
      {
        kind: "data",
        name: "beneficiary",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
  },
  {
    kind: "struct",
    name: "avnu::exchange::Exchange::OwnershipTransferred",
    type: "event",
    members: [
      {
        kind: "data",
        name: "previous_owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "new_owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
  },
  {
    kind: "enum",
    name: "avnu::exchange::Exchange::Event",
    type: "event",
    variants: [
      {
        kind: "nested",
        name: "Swap",
        type: "avnu::exchange::Exchange::Swap",
      },
      {
        kind: "nested",
        name: "OwnershipTransferred",
        type: "avnu::exchange::Exchange::OwnershipTransferred",
      },
    ],
  },
];
