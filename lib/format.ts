export const format = {
  openapi: "3.1.0",
  info: {
    title: "Ekubo API",
    version: "0.0.1",
    description: "API for querying data about Ekubo Protocol",
    contact: { url: "https://ekubo.org", email: "eng@ekubo.org" },
  },
  externalDocs: {
    url: "https://docs.ekubo.org",
    description: "Official documentation",
  },
  components: { schemas: {}, parameters: {} },
  paths: {
    "/airdrops": {
      get: {
        tags: ["Airdrop"],
        summary: "List airdrops",
        description: "Get the list of airdrop contracts",
        operationId: "get_ListDrops",
        parameters: [
          {
            schema: {
              anyOf: [
                {
                  type: "string",
                  pattern: "^0x[a-fA-F0-9]+$",
                  description: "A hexadecimal number",
                },
                {
                  type: "string",
                  pattern: "^\\d+e?\\d*$",
                  description: "A decimal number",
                },
              ],
              description: "The address of a contract on Starknet",
              title: "Address",
            },
            required: false,
            name: "token",
            in: "query",
          },
        ],
        responses: {
          "200": {
            description: "List of airdrops that are deployed",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      contract_address: {
                        anyOf: [
                          {
                            type: "string",
                            pattern: "^0x[a-fA-F0-9]+$",
                            description: "A hexadecimal number",
                          },
                          {
                            type: "string",
                            pattern: "^\\d+e?\\d*$",
                            description: "A decimal number",
                          },
                        ],
                        description: "The address of a contract on Starknet",
                        title: "Address",
                      },
                      token: {
                        anyOf: [
                          {
                            type: "string",
                            pattern: "^0x[a-fA-F0-9]+$",
                            description: "A hexadecimal number",
                          },
                          {
                            type: "string",
                            pattern: "^\\d+e?\\d*$",
                            description: "A decimal number",
                          },
                        ],
                        description: "The address of a contract on Starknet",
                        title: "Address",
                      },
                      start_date: { type: "string", format: "date-time" },
                      end_date: { type: "string", format: "date-time" },
                    },
                    required: [
                      "contract_address",
                      "token",
                      "start_date",
                      "end_date",
                    ],
                  },
                  description: "Array of airdrop contracts",
                },
              },
            },
          },
        },
      },
    },
    "/airdrops/{address}": {
      get: {
        tags: ["Airdrop"],
        summary: "List claims for account",
        description:
          "Get the list of airdrop contracts and related claims for the given account",
        operationId: "get_ListAvailableClaimsForUser",
        parameters: [
          {
            schema: {
              anyOf: [
                {
                  type: "string",
                  pattern: "^0x[a-fA-F0-9]+$",
                  description: "A hexadecimal number",
                },
                {
                  type: "string",
                  pattern: "^\\d+e?\\d*$",
                  description: "A decimal number",
                },
              ],
              description: "The address of a contract on Starknet",
              title: "Address",
            },
            required: true,
            name: "address",
            in: "path",
          },
          {
            schema: {
              anyOf: [
                {
                  type: "string",
                  pattern: "^0x[a-fA-F0-9]+$",
                  description: "A hexadecimal number",
                },
                {
                  type: "string",
                  pattern: "^\\d+e?\\d*$",
                  description: "A decimal number",
                },
              ],
              description: "The address of a contract on Starknet",
              title: "Address",
            },
            required: false,
            name: "token",
            in: "query",
          },
        ],
        responses: {
          "200": {
            description: "List of claims that are available for the address",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      contract_address: {
                        anyOf: [
                          {
                            type: "string",
                            pattern: "^0x[a-fA-F0-9]+$",
                            description: "A hexadecimal number",
                          },
                          {
                            type: "string",
                            pattern: "^\\d+e?\\d*$",
                            description: "A decimal number",
                          },
                        ],
                        description: "The address of a contract on Starknet",
                        title: "Address",
                      },
                      token: {
                        anyOf: [
                          {
                            type: "string",
                            pattern: "^0x[a-fA-F0-9]+$",
                            description: "A hexadecimal number",
                          },
                          {
                            type: "string",
                            pattern: "^\\d+e?\\d*$",
                            description: "A decimal number",
                          },
                        ],
                        description: "The address of a contract on Starknet",
                        title: "Address",
                      },
                      start_date: { type: "string", format: "date-time" },
                      end_date: { type: "string", format: "date-time" },
                      claim: {
                        type: "object",
                        properties: {
                          id: { type: "integer", minimum: 0 },
                          claimee: {
                            anyOf: [
                              {
                                type: "string",
                                pattern: "^0x[a-fA-F0-9]+$",
                                description: "A hexadecimal number",
                              },
                              {
                                type: "string",
                                pattern: "^\\d+e?\\d*$",
                                description: "A decimal number",
                              },
                            ],
                            description:
                              "The address of a contract on Starknet",
                            title: "Address",
                          },
                          amount: { type: "integer", minimum: 0 },
                        },
                        required: ["id", "claimee", "amount"],
                      },
                      proof: {
                        type: "array",
                        items: {
                          type: "string",
                          pattern: "^0x[a-fA-F0-9]+$",
                          description: "A hexadecimal number",
                        },
                      },
                    },
                    required: [
                      "contract_address",
                      "token",
                      "start_date",
                      "end_date",
                      "claim",
                      "proof",
                    ],
                  },
                  description: "Array of airdrop contracts",
                },
              },
            },
          },
        },
      },
    },
    "/airdrops/{contractAddress}/{startingId}": {
      get: {
        tags: ["Airdrop"],
        summary: "Get batch claim data",
        description:
          "Returns the batch claim data for the given contract and starting ID",
        operationId: "get_GetBatchAirdropClaim",
        parameters: [
          {
            schema: {
              anyOf: [
                {
                  type: "string",
                  pattern: "^0x[a-fA-F0-9]+$",
                  description: "A hexadecimal number",
                },
                {
                  type: "string",
                  pattern: "^\\d+e?\\d*$",
                  description: "A decimal number",
                },
              ],
              description: "The address of a contract on Starknet",
              title: "Address",
            },
            required: true,
            name: "contractAddress",
            in: "path",
          },
          {
            schema: {
              anyOf: [
                {
                  type: "string",
                  pattern: "^0x[a-fA-F0-9]+$",
                  description: "A hexadecimal number",
                },
                {
                  type: "string",
                  pattern: "^\\d+e?\\d*$",
                  description: "A decimal number",
                },
              ],
              description: "A number represented in hexadecimal or decimal",
              title: "Numeric",
            },
            required: true,
            name: "startingId",
            in: "path",
          },
        ],
        responses: {
          "200": {
            description: "List of claims and remaining proof data",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    claims: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: { type: "integer", minimum: 0 },
                          claimee: {
                            anyOf: [
                              {
                                type: "string",
                                pattern: "^0x[a-fA-F0-9]+$",
                                description: "A hexadecimal number",
                              },
                              {
                                type: "string",
                                pattern: "^\\d+e?\\d*$",
                                description: "A decimal number",
                              },
                            ],
                            description:
                              "The address of a contract on Starknet",
                            title: "Address",
                          },
                          amount: { type: "integer", minimum: 0 },
                        },
                        required: ["id", "claimee", "amount"],
                      },
                    },
                    remaining_proof: {
                      type: "array",
                      items: {
                        type: "string",
                        pattern: "^0x[a-fA-F0-9]+$",
                        description: "A hexadecimal number",
                      },
                    },
                  },
                  required: ["claims", "remaining_proof"],
                  description:
                    "Array of claim data and the remaining proof starting from the given ID",
                },
              },
            },
          },
        },
      },
    },
    "/defi-spring-incentives": {
      get: {
        tags: ["Meta"],
        summary: "DeFi Spring Incentives",
        description: "Get information about the DeFi Spring Incentives program",
        operationId: "get_GetDefiSpringIncentives",
        responses: {
          "200": {
            description: "The allocation of incentives",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    strkPrice: { type: "number", minimum: 0 },
                    totalStrk: { type: "number", minimum: 0 },
                    pairs: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          token0: {
                            type: "object",
                            properties: {
                              name: {
                                type: "string",
                                minLength: 1,
                                maxLength: 32,
                                description: "Name of the token",
                              },
                              symbol: {
                                type: "string",
                                minLength: 1,
                                maxLength: 32,
                                description: "Symbol for the token",
                              },
                              decimals: {
                                type: "integer",
                                minimum: 0,
                                maximum: 78,
                                description:
                                  "The number of decimals used for display of token balances",
                              },
                              l2_token_address: {
                                type: "string",
                                description:
                                  "The address of the token on Starknet",
                              },
                              sort_order: {
                                type: "integer",
                                description:
                                  "How much the token should prefer to be the numerator",
                              },
                              total_supply: {
                                type: ["integer", "null"],
                                minimum: 0,
                                description: "The total supply of the token",
                              },
                              hidden: {
                                type: "boolean",
                                description:
                                  "Whether the token should display by default in the interface.",
                              },
                              disabled: {
                                type: "boolean",
                                description:
                                  "Whether the token has been disabled for use in Ekubo Interface",
                              },
                              logo_url: { type: "string", format: "uri" },
                            },
                            required: [
                              "name",
                              "symbol",
                              "decimals",
                              "l2_token_address",
                              "sort_order",
                              "total_supply",
                            ],
                          },
                          token1: {
                            type: "object",
                            properties: {
                              name: {
                                type: "string",
                                minLength: 1,
                                maxLength: 32,
                                description: "Name of the token",
                              },
                              symbol: {
                                type: "string",
                                minLength: 1,
                                maxLength: 32,
                                description: "Symbol for the token",
                              },
                              decimals: {
                                type: "integer",
                                minimum: 0,
                                maximum: 78,
                                description:
                                  "The number of decimals used for display of token balances",
                              },
                              l2_token_address: {
                                type: "string",
                                description:
                                  "The address of the token on Starknet",
                              },
                              sort_order: {
                                type: "integer",
                                description:
                                  "How much the token should prefer to be the numerator",
                              },
                              total_supply: {
                                type: ["integer", "null"],
                                minimum: 0,
                                description: "The total supply of the token",
                              },
                              hidden: {
                                type: "boolean",
                                description:
                                  "Whether the token should display by default in the interface.",
                              },
                              disabled: {
                                type: "boolean",
                                description:
                                  "Whether the token has been disabled for use in Ekubo Interface",
                              },
                              logo_url: { type: "string", format: "uri" },
                            },
                            required: [
                              "name",
                              "symbol",
                              "decimals",
                              "l2_token_address",
                              "sort_order",
                              "total_supply",
                            ],
                          },
                          allocations: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                date: { type: "string", format: "date-time" },
                                allocation: { type: "number", minimum: 0 },
                                thirty_day_realized_volatility: {
                                  type: "number",
                                },
                              },
                              required: [
                                "date",
                                "allocation",
                                "thirty_day_realized_volatility",
                              ],
                            },
                          },
                          currentApr: { type: "number", minimum: 0 },
                          volatilityInTicks: { type: "integer", minimum: 0 },
                          sevenDayRealizedVolatilityInTicks: {
                            type: "integer",
                            minimum: 0,
                          },
                          consideredTvl: { type: "number", minimum: 0 },
                        },
                        required: ["token0", "token1", "allocations"],
                      },
                    },
                  },
                  required: ["strkPrice", "totalStrk", "pairs"],
                },
              },
            },
          },
        },
      },
    },
    "/defi-spring-incentives/by-token/{tokenId}": {
      get: {
        tags: ["Meta"],
        summary: "Get token incentives",
        description:
          "Get the total incentives for the given token ID over the period",
        operationId: "get_GetDefiSpringIncentivesForTokenId",
        parameters: [
          {
            schema: {
              anyOf: [
                {
                  type: "string",
                  pattern: "^0x[a-fA-F0-9]+$",
                  description: "A hexadecimal number",
                },
                {
                  type: "string",
                  pattern: "^\\d+e?\\d*$",
                  description: "A decimal number",
                },
              ],
              description: "A number represented in hexadecimal or decimal",
              title: "Numeric",
            },
            required: true,
            name: "tokenId",
            in: "path",
          },
        ],
        responses: {
          "200": {
            description: "The allocation of incentives for the given token ID",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    total: { type: "number" },
                    per_day: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          date: {
                            type: "string",
                            pattern: "^\\d{4}-\\d{2}-\\d{2}$",
                            description: "An ISO date",
                          },
                          amount: { type: "number", minimum: 0 },
                        },
                        required: ["date", "amount"],
                      },
                    },
                  },
                  required: ["total", "per_day"],
                  description:
                    "Describes the allocation for a particular token",
                },
              },
            },
          },
        },
      },
    },
    "/defi-spring-incentives/{address}/{start}/{end}": {
      get: {
        tags: ["Meta"],
        summary: "Get address incentives",
        description:
          "Get the total incentives for the given address over the period",
        operationId: "get_GetDefiSpringIncentivesForAddressAndDates",
        parameters: [
          {
            schema: {
              anyOf: [
                {
                  type: "string",
                  pattern: "^0x[a-fA-F0-9]+$",
                  description: "A hexadecimal number",
                },
                {
                  type: "string",
                  pattern: "^\\d+e?\\d*$",
                  description: "A decimal number",
                },
              ],
              description: "The address of a contract on Starknet",
              title: "Address",
            },
            required: true,
            name: "address",
            in: "path",
          },
          {
            schema: {
              type: "string",
              pattern: "^\\d{4}-\\d{2}-\\d{2}$",
              description: "The first date for which to query, inclusive",
            },
            required: true,
            name: "start",
            in: "path",
          },
          {
            schema: {
              type: "string",
              pattern: "^\\d{4}-\\d{2}-\\d{2}$",
              description: "The last date for which to query, exclusive",
            },
            required: true,
            name: "end",
            in: "path",
          },
        ],
        responses: {
          "200": {
            description:
              "The allocation of incentives for each token ID held or burned by the address",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  description:
                    "Describes the allocation for a particular token",
                  example: {
                    "1": {
                      total: 1234.56,
                      per_day: [{ date: "2024-02-22", amount: 1234.56 }],
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/tokens": {
      get: {
        tags: ["Meta"],
        summary: "List tokens",
        description: "Get the list of supported tokens",
        operationId: "get_ListTokens",
        responses: {
          "200": {
            description: "List of tokens",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: {
                        type: "string",
                        minLength: 1,
                        maxLength: 32,
                        description: "Name of the token",
                      },
                      symbol: {
                        type: "string",
                        minLength: 1,
                        maxLength: 32,
                        description: "Symbol for the token",
                      },
                      decimals: {
                        type: "integer",
                        minimum: 0,
                        maximum: 78,
                        description:
                          "The number of decimals used for display of token balances",
                      },
                      l2_token_address: {
                        type: "string",
                        description: "The address of the token on Starknet",
                      },
                      sort_order: {
                        type: "integer",
                        description:
                          "How much the token should prefer to be the numerator",
                      },
                      total_supply: {
                        type: ["integer", "null"],
                        minimum: 0,
                        description: "The total supply of the token",
                      },
                      hidden: {
                        type: "boolean",
                        description:
                          "Whether the token should display by default in the interface.",
                      },
                      disabled: {
                        type: "boolean",
                        description:
                          "Whether the token has been disabled for use in Ekubo Interface",
                      },
                      logo_url: { type: "string", format: "uri" },
                    },
                    required: [
                      "name",
                      "symbol",
                      "decimals",
                      "l2_token_address",
                      "sort_order",
                      "total_supply",
                    ],
                  },
                  description: "Array of tokens",
                },
              },
            },
          },
        },
      },
    },
    "/blocks/{blockTag}": {
      get: {
        tags: ["Meta"],
        summary: "Get block",
        description:
          "Get information about a particular block ingested by the API",
        operationId: "get_GetBlock",
        parameters: [
          {
            schema: {
              anyOf: [
                { type: "integer", minimum: 160000 },
                { type: "string", enum: ["latest"] },
              ],
              description:
                "The tag of the block to get or the number of a block containing events",
            },
            required: true,
            name: "blockTag",
            in: "path",
          },
        ],
        responses: {
          "200": {
            description: "The timestamp of the given block number",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    number: {
                      type: "integer",
                      description: "The number of the block",
                    },
                    timestamp: {
                      type: "string",
                      description: "The timestamp of the block",
                    },
                  },
                  required: ["number", "timestamp"],
                  description: "Description of the latest block",
                },
              },
            },
          },
        },
      },
    },
    "/leaderboard": {
      get: {
        tags: ["Leaderboard"],
        summary: "List leaderboard",
        description: "Get the first thousand users on the leaderboard",
        operationId: "get_GetLeaderboard",
        parameters: [
          {
            schema: { type: "integer", minimum: 1, maximum: 1000 },
            required: false,
            name: "pageSize",
            in: "query",
          },
          {
            schema: { type: ["integer", "null"], minimum: 0 },
            required: false,
            name: "start",
            in: "query",
          },
        ],
        responses: {
          "200": {
            description:
              "The list of addresses and the number of points earned over the specified period",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    timestamp: { type: "number" },
                    data: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          collector: { type: "string" },
                          referral_points: { type: "integer", minimum: 0 },
                          points: { type: "integer", minimum: 0 },
                        },
                        required: ["collector", "referral_points", "points"],
                      },
                    },
                  },
                  required: ["timestamp", "data"],
                },
              },
            },
          },
        },
      },
    },
    "/leaderboard/{collector}/points": {
      get: {
        tags: ["Leaderboard"],
        summary: "Get points",
        description:
          "Get the points for a specific collector on the leaderboard",
        operationId: "get_GetLeaderboardForCollector",
        parameters: [
          {
            schema: {
              anyOf: [
                {
                  type: "string",
                  pattern: "^0x[a-fA-F0-9]+$",
                  description: "A hexadecimal number",
                },
                {
                  type: "string",
                  pattern: "^\\d+e?\\d*$",
                  description: "A decimal number",
                },
              ],
              description: "The address of a contract on Starknet",
              title: "Address",
            },
            required: true,
            name: "collector",
            in: "path",
          },
        ],
        responses: {
          "200": {
            description:
              "The list of addresses and the number of points earned over the specified period",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    referral_points: { type: "integer", minimum: 0 },
                    points: { type: "integer", minimum: 0 },
                  },
                  required: ["referral_points", "points"],
                },
              },
            },
          },
        },
      },
    },
    "/quote/{amount}/{token}/{otherToken}": {
      get: {
        tags: ["Swap"],
        summary: "Get quote",
        description:
          "Returns a quote for a swap or series of swaps to/from one token amount from/to another token",
        operationId: "get_GetQuote",
        parameters: [
          {
            schema: {
              type: "string",
              description: "The amount of the specified token",
              examples: ["1e9", "1000000", "-1e18", "-100000000000000"],
              example: "-1e9",
            },
            required: true,
            name: "amount",
            in: "path",
          },
          {
            schema: {
              anyOf: [
                {
                  type: "string",
                  pattern: "^0x[a-fA-F0-9]+$",
                  description: "A hexadecimal number",
                },
                {
                  type: "string",
                  pattern: "^\\d+e?\\d*$",
                  description: "A decimal number",
                },
                {
                  type: "string",
                  minLength: 1,
                  maxLength: 31,
                  pattern: "^\\w+$",
                  description: "The symbol for a token",
                  title: "Symbol",
                },
              ],
              description: "A hexadecimal number",
              example: "USDC",
            },
            required: true,
            name: "token",
            in: "path",
          },
          {
            schema: {
              anyOf: [
                {
                  type: "string",
                  pattern: "^0x[a-fA-F0-9]+$",
                  description: "A hexadecimal number",
                },
                {
                  type: "string",
                  pattern: "^\\d+e?\\d*$",
                  description: "A decimal number",
                },
                {
                  type: "string",
                  minLength: 1,
                  maxLength: 31,
                  pattern: "^\\w+$",
                  description: "The symbol for a token",
                  title: "Symbol",
                },
              ],
              description: "A hexadecimal number",
              example: "ETH",
            },
            required: true,
            name: "otherToken",
            in: "path",
          },
          {
            schema: {
              type: ["integer", "null"],
              minimum: 0,
              maximum: 12,
              description:
                "The maximum number of routes that the amount can be split across",
            },
            required: false,
            name: "maxSplits",
            in: "query",
          },
        ],
        responses: {
          "200": {
            description: "The suggested split routes to get the best price",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    total: { type: "string" },
                    splits: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          specifiedAmount: { type: "string" },
                          amount: {
                            type: "string",
                            pattern: "^-?\\d+$",
                            description: "The calculated amount for the quote",
                            example: "-123456",
                          },
                          route: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                pool_key: {
                                  type: "object",
                                  properties: {
                                    token0: {
                                      anyOf: [
                                        {
                                          type: "string",
                                          pattern: "^0x[a-fA-F0-9]+$",
                                          description: "A hexadecimal number",
                                        },
                                        {
                                          type: "string",
                                          pattern: "^\\d+e?\\d*$",
                                          description: "A decimal number",
                                        },
                                      ],
                                      description:
                                        "The address of a contract on Starknet",
                                      title: "Address",
                                      example:
                                        "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
                                    },
                                    token1: {
                                      anyOf: [
                                        {
                                          type: "string",
                                          pattern: "^0x[a-fA-F0-9]+$",
                                          description: "A hexadecimal number",
                                        },
                                        {
                                          type: "string",
                                          pattern: "^\\d+e?\\d*$",
                                          description: "A decimal number",
                                        },
                                      ],
                                      description:
                                        "The address of a contract on Starknet",
                                      title: "Address",
                                      example:
                                        "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
                                    },
                                    fee: {
                                      type: "string",
                                      pattern: "^0x[a-fA-F0-9]+$",
                                      description: "A hexadecimal number",
                                      example:
                                        "0x20c49ba5e353f80000000000000000",
                                    },
                                    tick_spacing: {
                                      type: "integer",
                                      exclusiveMinimum: 0,
                                      example: 1000,
                                    },
                                    extension: {
                                      type: "string",
                                      pattern: "^0x[a-fA-F0-9]+$",
                                      description: "A hexadecimal number",
                                      example: "0x0",
                                    },
                                  },
                                  required: [
                                    "token0",
                                    "token1",
                                    "fee",
                                    "tick_spacing",
                                    "extension",
                                  ],
                                  description:
                                    "The composite key identifier for a pool in Ekubo",
                                },
                                sqrt_ratio_limit: {
                                  type: "string",
                                  pattern: "^0x[a-fA-F0-9]+$",
                                  description: "A hexadecimal number",
                                  example:
                                    "0xfffffc080ed7b4556f3528fe26840249f4b191ef6dff7928",
                                },
                                skip_ahead: {
                                  type: "number",
                                  description:
                                    "A suggested skip_ahead value for gas optimizing the trade",
                                  example: 123,
                                },
                              },
                              required: [
                                "pool_key",
                                "sqrt_ratio_limit",
                                "skip_ahead",
                              ],
                            },
                            description:
                              "The list of pool keys through which to swap",
                          },
                        },
                        required: ["specifiedAmount", "amount", "route"],
                      },
                    },
                  },
                  required: ["total", "splits"],
                },
              },
            },
          },
        },
      },
    },
    "/overview": {
      get: {
        tags: ["Stats"],
        summary: "Get protocol overview",
        description: "Returns an overview of the high level protocol stats",
        operationId: "get_GetOverview",
        responses: {
          "200": {
            description: "The stats for the protocol overall",
            content: {
              "application/json": {
                schema: { type: "object", properties: {} },
              },
            },
          },
        },
      },
    },
    "/overview/pairs": {
      get: {
        tags: ["Stats"],
        summary: "Get pairs",
        description: "Returns stats for the top pairs",
        operationId: "get_GetOverviewPairs",
        responses: {
          "200": {
            description: "The stats for the protocols top pairs",
            content: {
              "application/json": {
                schema: { type: "object", properties: {} },
              },
            },
          },
        },
      },
    },
    "/overview/revenue": {
      get: {
        tags: ["Stats"],
        summary: "Get revenue",
        description: "Returns the revenue stats for the protocol",
        operationId: "get_GetOverviewRevenue",
        responses: {
          "200": {
            description: "The revenue stats for the protocol",
            content: {
              "application/json": {
                schema: { type: "object", properties: {} },
              },
            },
          },
        },
      },
    },
    "/overview/tvl": {
      get: {
        tags: ["Stats"],
        summary: "Get TVL",
        description: "Returns the TVL portion of the overview",
        operationId: "get_GetOverviewTvl",
        responses: {
          "200": {
            description: "The TVL stats",
            content: {
              "application/json": {
                schema: { type: "object", properties: {} },
              },
            },
          },
        },
      },
    },
    "/overview/volume": {
      get: {
        tags: ["Stats"],
        summary: "Get volume",
        description: "Returns the volume portion of the overview",
        operationId: "get_GetOverviewVolume",
        responses: {
          "200": {
            description: "The volume stats for the protocol",
            content: {
              "application/json": {
                schema: { type: "object", properties: {} },
              },
            },
          },
        },
      },
    },
    "/pair/{tokenA}/{tokenB}": {
      get: {
        tags: ["Stats"],
        summary: "Get pair stats",
        description: "Returns high level stats for a given trading pair",
        operationId: "get_GetPairInfo",
        parameters: [
          {
            schema: {
              anyOf: [
                {
                  type: "string",
                  pattern: "^0x[a-fA-F0-9]+$",
                  description: "A hexadecimal number",
                },
                {
                  type: "string",
                  pattern: "^\\d+e?\\d*$",
                  description: "A decimal number",
                },
                {
                  type: "string",
                  minLength: 1,
                  maxLength: 31,
                  pattern: "^\\w+$",
                  description: "The symbol for a token",
                  title: "Symbol",
                },
              ],
              description: "A hexadecimal number",
            },
            required: true,
            name: "tokenA",
            in: "path",
          },
          {
            schema: {
              anyOf: [
                {
                  type: "string",
                  pattern: "^0x[a-fA-F0-9]+$",
                  description: "A hexadecimal number",
                },
                {
                  type: "string",
                  pattern: "^\\d+e?\\d*$",
                  description: "A decimal number",
                },
                {
                  type: "string",
                  minLength: 1,
                  maxLength: 31,
                  pattern: "^\\w+$",
                  description: "The symbol for a token",
                  title: "Symbol",
                },
              ],
              description: "A hexadecimal number",
            },
            required: true,
            name: "tokenB",
            in: "path",
          },
        ],
        responses: {
          "200": {
            description: "Information about the token pair",
            content: {
              "application/json": {
                schema: { type: "object", properties: {} },
              },
            },
          },
        },
      },
    },
    "/pair/{tokenA}/{tokenB}/tvl": {
      get: {
        tags: ["Stats"],
        summary: "Get pair TVL",
        description: "Returns TVL stats for the pair",
        operationId: "get_GetPairInfoTvl",
        parameters: [
          {
            schema: {
              anyOf: [
                {
                  type: "string",
                  pattern: "^0x[a-fA-F0-9]+$",
                  description: "A hexadecimal number",
                },
                {
                  type: "string",
                  pattern: "^\\d+e?\\d*$",
                  description: "A decimal number",
                },
                {
                  type: "string",
                  minLength: 1,
                  maxLength: 31,
                  pattern: "^\\w+$",
                  description: "The symbol for a token",
                  title: "Symbol",
                },
              ],
              description: "A hexadecimal number",
            },
            required: true,
            name: "tokenA",
            in: "path",
          },
          {
            schema: {
              anyOf: [
                {
                  type: "string",
                  pattern: "^0x[a-fA-F0-9]+$",
                  description: "A hexadecimal number",
                },
                {
                  type: "string",
                  pattern: "^\\d+e?\\d*$",
                  description: "A decimal number",
                },
                {
                  type: "string",
                  minLength: 1,
                  maxLength: 31,
                  pattern: "^\\w+$",
                  description: "The symbol for a token",
                  title: "Symbol",
                },
              ],
              description: "A hexadecimal number",
            },
            required: true,
            name: "tokenB",
            in: "path",
          },
        ],
        responses: {
          "200": {
            description: "Information about the token pair TVL",
            content: {
              "application/json": {
                schema: { type: "object", properties: {} },
              },
            },
          },
        },
      },
    },
    "/pair/{tokenA}/{tokenB}/volume": {
      get: {
        tags: ["Stats"],
        summary: "Get pair volume",
        description: "Returns volume stats for a given trading pair",
        operationId: "get_GetPairInfoVolume",
        parameters: [
          {
            schema: {
              anyOf: [
                {
                  type: "string",
                  pattern: "^0x[a-fA-F0-9]+$",
                  description: "A hexadecimal number",
                },
                {
                  type: "string",
                  pattern: "^\\d+e?\\d*$",
                  description: "A decimal number",
                },
                {
                  type: "string",
                  minLength: 1,
                  maxLength: 31,
                  pattern: "^\\w+$",
                  description: "The symbol for a token",
                  title: "Symbol",
                },
              ],
              description: "A hexadecimal number",
            },
            required: true,
            name: "tokenA",
            in: "path",
          },
          {
            schema: {
              anyOf: [
                {
                  type: "string",
                  pattern: "^0x[a-fA-F0-9]+$",
                  description: "A hexadecimal number",
                },
                {
                  type: "string",
                  pattern: "^\\d+e?\\d*$",
                  description: "A decimal number",
                },
                {
                  type: "string",
                  minLength: 1,
                  maxLength: 31,
                  pattern: "^\\w+$",
                  description: "The symbol for a token",
                  title: "Symbol",
                },
              ],
              description: "A hexadecimal number",
            },
            required: true,
            name: "tokenB",
            in: "path",
          },
        ],
        responses: {
          "200": {
            description: "Information about the token pair volume",
            content: {
              "application/json": {
                schema: { type: "object", properties: {} },
              },
            },
          },
        },
      },
    },
    "/pair/{tokenA}/{tokenB}/pools": {
      get: {
        tags: ["Stats"],
        summary: "Get pools of pair",
        description: "Returns pool info for a pair",
        operationId: "get_GetPairInfoPools",
        parameters: [
          {
            schema: {
              anyOf: [
                {
                  type: "string",
                  pattern: "^0x[a-fA-F0-9]+$",
                  description: "A hexadecimal number",
                },
                {
                  type: "string",
                  pattern: "^\\d+e?\\d*$",
                  description: "A decimal number",
                },
                {
                  type: "string",
                  minLength: 1,
                  maxLength: 31,
                  pattern: "^\\w+$",
                  description: "The symbol for a token",
                  title: "Symbol",
                },
              ],
              description: "A hexadecimal number",
            },
            required: true,
            name: "tokenA",
            in: "path",
          },
          {
            schema: {
              anyOf: [
                {
                  type: "string",
                  pattern: "^0x[a-fA-F0-9]+$",
                  description: "A hexadecimal number",
                },
                {
                  type: "string",
                  pattern: "^\\d+e?\\d*$",
                  description: "A decimal number",
                },
                {
                  type: "string",
                  minLength: 1,
                  maxLength: 31,
                  pattern: "^\\w+$",
                  description: "The symbol for a token",
                  title: "Symbol",
                },
              ],
              description: "A hexadecimal number",
            },
            required: true,
            name: "tokenB",
            in: "path",
          },
        ],
        responses: {
          "200": {
            description: "Information about the pools of a token pair",
            content: {
              "application/json": {
                schema: { type: "object", properties: {} },
              },
            },
          },
        },
      },
    },
    "/price/{baseToken}/{quoteToken}/history": {
      get: {
        tags: ["Prices"],
        summary: "Get price history",
        description: "Get the VWAP-based price history for the given pair",
        operationId: "get_GetPairPriceHistory",
        parameters: [
          {
            schema: {
              anyOf: [
                {
                  type: "string",
                  pattern: "^0x[a-fA-F0-9]+$",
                  description: "A hexadecimal number",
                },
                {
                  type: "string",
                  pattern: "^\\d+e?\\d*$",
                  description: "A decimal number",
                },
                {
                  type: "string",
                  minLength: 1,
                  maxLength: 31,
                  pattern: "^\\w+$",
                  description: "The symbol for a token",
                  title: "Symbol",
                },
              ],
              description: "A hexadecimal number",
              example: "ETH",
            },
            required: true,
            name: "baseToken",
            in: "path",
          },
          {
            schema: {
              anyOf: [
                {
                  type: "string",
                  pattern: "^0x[a-fA-F0-9]+$",
                  description: "A hexadecimal number",
                },
                {
                  type: "string",
                  pattern: "^\\d+e?\\d*$",
                  description: "A decimal number",
                },
                {
                  type: "string",
                  minLength: 1,
                  maxLength: 31,
                  pattern: "^\\w+$",
                  description: "The symbol for a token",
                  title: "Symbol",
                },
              ],
              description: "A hexadecimal number",
              example: "USDC",
            },
            required: true,
            name: "quoteToken",
            in: "path",
          },
          {
            schema: { type: "integer", minimum: 60 },
            required: false,
            name: "interval",
            in: "query",
          },
        ],
        responses: {
          "200": {
            description: "The price history of the pair",
            content: {
              "application/json": {
                schema: { type: "object", properties: {} },
              },
            },
          },
        },
      },
    },
    "/pools": {
      get: {
        tags: ["Swap"],
        summary: "Get pool states",
        description:
          "Returns the current state of all the Ekubo pools, including current liquidity and price",
        operationId: "get_GetPoolStates",
        responses: {
          "200": {
            description: "The current state of all the pools",
            content: {
              "application/json": {
                schema: { type: "object", properties: {} },
              },
            },
          },
        },
      },
    },
    "/pools/{keyHash}": {
      get: {
        tags: ["Swap", "Meta"],
        summary: "Get pool info",
        description:
          "Returns the information associated with the given pool key hash",
        operationId: "get_GetPoolKeyHash",
        parameters: [
          {
            schema: {
              anyOf: [
                {
                  type: "string",
                  pattern: "^0x[a-fA-F0-9]+$",
                  description: "A hexadecimal number",
                },
                {
                  type: "string",
                  pattern: "^\\d+e?\\d*$",
                  description: "A decimal number",
                },
              ],
              description: "A number represented in hexadecimal or decimal",
              title: "Numeric",
              example: "0xabcd",
            },
            required: true,
            name: "keyHash",
            in: "path",
          },
        ],
        responses: {
          "200": {
            description: "The description of the pool key",
            content: {
              "application/json": {
                schema: { type: "object", properties: {} },
              },
            },
          },
        },
      },
    },
    "/pools/{keyHash}/liquidity": {
      get: {
        tags: ["Swap"],
        summary: "Get pool liquidity",
        description:
          "Returns the liquidity delta for each tick for the given pool key hash",
        operationId: "get_GetPoolLiquidity",
        parameters: [
          {
            schema: {
              anyOf: [
                {
                  type: "string",
                  pattern: "^0x[a-fA-F0-9]+$",
                  description: "A hexadecimal number",
                },
                {
                  type: "string",
                  pattern: "^\\d+e?\\d*$",
                  description: "A decimal number",
                },
              ],
              description: "A number represented in hexadecimal or decimal",
              title: "Numeric",
              example: "0xabcd",
            },
            required: true,
            name: "keyHash",
            in: "path",
          },
        ],
        responses: {
          "200": {
            description:
              "The current liquidity chart for the given pool key hash",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { type: "object", properties: {} },
                },
              },
            },
          },
        },
      },
    },
    "/positions/{address}": {
      get: {
        tags: ["Positions"],
        summary: "List positions",
        description: "Returns the list of position NFTs and their keys",
        operationId: "get_ListPositions",
        parameters: [
          {
            schema: {
              anyOf: [
                {
                  type: "string",
                  pattern: "^0x[a-fA-F0-9]+$",
                  description: "A hexadecimal number",
                },
                {
                  type: "string",
                  pattern: "^\\d+e?\\d*$",
                  description: "A decimal number",
                },
              ],
              description: "The address of a contract on Starknet",
              title: "Address",
            },
            required: true,
            name: "address",
            in: "path",
          },
          {
            schema: { type: ["boolean", "null"] },
            required: false,
            name: "showClosed",
            in: "query",
          },
        ],
        responses: {
          "200": {
            description: "The position NFTs owned by the address and keys",
            content: {
              "application/json": {
                schema: { type: "object", properties: {} },
              },
            },
          },
        },
      },
    },
    "/tokens/{tokenA}/{tokenB}/liquidity": {
      get: {
        tags: ["Stats"],
        summary: "Get pair liquidity",
        description:
          "Returns the liquidity chart for the given token pair, aggregated across all pools",
        operationId: "get_GetPairLiquidity",
        parameters: [
          {
            schema: {
              anyOf: [
                {
                  type: "string",
                  pattern: "^0x[a-fA-F0-9]+$",
                  description: "A hexadecimal number",
                },
                {
                  type: "string",
                  pattern: "^\\d+e?\\d*$",
                  description: "A decimal number",
                },
                {
                  type: "string",
                  minLength: 1,
                  maxLength: 31,
                  pattern: "^\\w+$",
                  description: "The symbol for a token",
                  title: "Symbol",
                },
              ],
              description: "A hexadecimal number",
            },
            required: true,
            name: "tokenA",
            in: "path",
          },
          {
            schema: {
              anyOf: [
                {
                  type: "string",
                  pattern: "^0x[a-fA-F0-9]+$",
                  description: "A hexadecimal number",
                },
                {
                  type: "string",
                  pattern: "^\\d+e?\\d*$",
                  description: "A decimal number",
                },
                {
                  type: "string",
                  minLength: 1,
                  maxLength: 31,
                  pattern: "^\\w+$",
                  description: "The symbol for a token",
                  title: "Symbol",
                },
              ],
              description: "A hexadecimal number",
            },
            required: true,
            name: "tokenB",
            in: "path",
          },
        ],
        responses: {
          "200": {
            description:
              "For each tick for pools of the pair, the liquidity delta",
            content: {
              "application/json": {
                schema: { type: "object", properties: {} },
              },
            },
          },
        },
      },
    },
    "/tokens/{tokenA}/{tokenB}/events": {
      get: {
        tags: ["Stats"],
        summary: "Get pair events",
        description:
          "Returns a list of recent events for the given trading pair",
        operationId: "get_ListPairEvents",
        parameters: [
          {
            schema: {
              anyOf: [
                {
                  type: "string",
                  pattern: "^0x[a-fA-F0-9]+$",
                  description: "A hexadecimal number",
                },
                {
                  type: "string",
                  pattern: "^\\d+e?\\d*$",
                  description: "A decimal number",
                },
                {
                  type: "string",
                  minLength: 1,
                  maxLength: 31,
                  pattern: "^\\w+$",
                  description: "The symbol for a token",
                  title: "Symbol",
                },
              ],
              description: "A hexadecimal number",
            },
            required: true,
            name: "tokenA",
            in: "path",
          },
          {
            schema: {
              anyOf: [
                {
                  type: "string",
                  pattern: "^0x[a-fA-F0-9]+$",
                  description: "A hexadecimal number",
                },
                {
                  type: "string",
                  pattern: "^\\d+e?\\d*$",
                  description: "A decimal number",
                },
                {
                  type: "string",
                  minLength: 1,
                  maxLength: 31,
                  pattern: "^\\w+$",
                  description: "The symbol for a token",
                  title: "Symbol",
                },
              ],
              description: "A hexadecimal number",
            },
            required: true,
            name: "tokenB",
            in: "path",
          },
        ],
        responses: {
          "200": {
            description: "A list of events for the given pair",
            content: {
              "application/json": {
                schema: { type: "object", properties: {} },
              },
            },
          },
        },
      },
    },
    "/{id}/state": {
      get: {
        tags: ["Positions"],
        summary: "Get NFT State",
        description: "Returns the last owner of the position",
        operationId: "get_GetNftState",
        parameters: [
          {
            schema: {
              type: "integer",
              minimum: 1,
              maximum: 9999999999,
              description: "The ID of a position NFT token",
              example: 1,
              title: "TokenID",
            },
            required: true,
            name: "id",
            in: "path",
          },
        ],
        responses: {
          "200": {
            description: "The state of the NFT with the given token ID",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    last_owner: {
                      type: "string",
                      pattern: "^0x[a-fA-F0-9]+$",
                      description: "A hexadecimal number",
                    },
                  },
                  required: ["last_owner"],
                },
              },
            },
          },
        },
      },
    },
    "/{id}": {
      get: {
        tags: ["Positions"],
        summary: "Get NFT Metadata",
        description:
          "Returns the ERC721 metadata for the given position token ID",
        operationId: "get_GetNftMetadata",
        parameters: [
          {
            schema: {
              type: "integer",
              minimum: 1,
              maximum: 9999999999,
              description: "The ID of a position NFT token",
              example: 1,
              title: "TokenID",
            },
            required: true,
            name: "id",
            in: "path",
          },
        ],
        responses: {
          "200": {
            description: "The NFT metadata for the given position ID",
            content: {
              "application/json": {
                schema: { type: "object", properties: {} },
              },
            },
          },
        },
      },
    },
    "/{id}/history": {
      get: {
        tags: ["Positions"],
        summary: "List position history",
        description: "Returns the entire history of the given position ID",
        operationId: "get_ListNftEvents",
        parameters: [
          {
            schema: {
              type: "integer",
              minimum: 1,
              maximum: 9999999999,
              description: "The ID of a position NFT token",
              example: 1,
              title: "TokenID",
            },
            required: true,
            name: "id",
            in: "path",
          },
        ],
        responses: {
          "200": {
            description: "The position history",
            content: {
              "application/json": {
                schema: { type: "object", properties: {} },
              },
            },
          },
        },
      },
    },
    "/{id}/image.svg": {
      get: {
        tags: ["Positions"],
        summary: "Get NFT Image",
        description: "Returns the generated art for the given position NFT ID",
        operationId: "get_GetNftImage",
        parameters: [
          {
            schema: {
              type: "integer",
              minimum: 1,
              maximum: 9999999999,
              description: "The ID of a position NFT token",
              example: 1,
              title: "TokenID",
            },
            required: true,
            name: "id",
            in: "path",
          },
        ],
        responses: {
          "200": {
            description: "The position NFT image",
            content: {
              "application/json": {
                schema: { type: "object", properties: {} },
              },
            },
          },
        },
      },
    },
    "/twap/pools/{tokenA}/{tokenB}/{fee}": {
      get: {
        tags: ["TWAP"],
        summary: "Get TWAP pool",
        description:
          "Returns the current state of the given TWAMM pool, including the future order expirations",
        operationId: "get_GetTwammPoolState",
        parameters: [
          {
            schema: {
              anyOf: [
                {
                  type: "string",
                  pattern: "^0x[a-fA-F0-9]+$",
                  description: "A hexadecimal number",
                },
                {
                  type: "string",
                  pattern: "^\\d+e?\\d*$",
                  description: "A decimal number",
                },
                {
                  type: "string",
                  minLength: 1,
                  maxLength: 31,
                  pattern: "^\\w+$",
                  description: "The symbol for a token",
                  title: "Symbol",
                },
              ],
              description: "A hexadecimal number",
              example: "ETH",
            },
            required: true,
            name: "tokenA",
            in: "path",
          },
          {
            schema: {
              anyOf: [
                {
                  type: "string",
                  pattern: "^0x[a-fA-F0-9]+$",
                  description: "A hexadecimal number",
                },
                {
                  type: "string",
                  pattern: "^\\d+e?\\d*$",
                  description: "A decimal number",
                },
                {
                  type: "string",
                  minLength: 1,
                  maxLength: 31,
                  pattern: "^\\w+$",
                  description: "The symbol for a token",
                  title: "Symbol",
                },
              ],
              description: "A hexadecimal number",
              example: "USDC",
            },
            required: true,
            name: "tokenB",
            in: "path",
          },
          {
            schema: {
              anyOf: [
                {
                  type: "string",
                  pattern: "^0x[a-fA-F0-9]+$",
                  description: "A hexadecimal number",
                },
                {
                  type: "string",
                  pattern: "^\\d+e?\\d*$",
                  description: "A decimal number",
                },
              ],
              description: "A number represented in hexadecimal or decimal",
              title: "Numeric",
            },
            required: true,
            name: "fee",
            in: "path",
          },
        ],
        responses: {
          "200": {
            description: "The current state of the given TWAMM pool",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    saleRateDeltas: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          time: { type: "integer", minimum: 0 },
                          token0SaleRateDelta: {
                            type: "string",
                            pattern: "^\\d+e?\\d*$",
                            description: "A decimal number",
                          },
                          token1SaleRateDelta: {
                            type: "string",
                            pattern: "^\\d+e?\\d*$",
                            description: "A decimal number",
                          },
                        },
                        required: [
                          "time",
                          "token0SaleRateDelta",
                          "token1SaleRateDelta",
                        ],
                      },
                    },
                  },
                  required: ["saleRateDeltas"],
                },
              },
            },
          },
        },
      },
    },
    "/twap/pair/{tokenA}/{tokenB}": {
      get: {
        tags: ["TWAP"],
        summary: "Get TWAP pair",
        description:
          "Returns the current state of the given TWAMM pair, including the future order expirations",
        operationId: "get_GetTwammPairState",
        parameters: [
          {
            schema: {
              anyOf: [
                {
                  type: "string",
                  pattern: "^0x[a-fA-F0-9]+$",
                  description: "A hexadecimal number",
                },
                {
                  type: "string",
                  pattern: "^\\d+e?\\d*$",
                  description: "A decimal number",
                },
                {
                  type: "string",
                  minLength: 1,
                  maxLength: 31,
                  pattern: "^\\w+$",
                  description: "The symbol for a token",
                  title: "Symbol",
                },
              ],
              description: "A hexadecimal number",
              example: "ETH",
            },
            required: true,
            name: "tokenA",
            in: "path",
          },
          {
            schema: {
              anyOf: [
                {
                  type: "string",
                  pattern: "^0x[a-fA-F0-9]+$",
                  description: "A hexadecimal number",
                },
                {
                  type: "string",
                  pattern: "^\\d+e?\\d*$",
                  description: "A decimal number",
                },
                {
                  type: "string",
                  minLength: 1,
                  maxLength: 31,
                  pattern: "^\\w+$",
                  description: "The symbol for a token",
                  title: "Symbol",
                },
              ],
              description: "A hexadecimal number",
              example: "USDC",
            },
            required: true,
            name: "tokenB",
            in: "path",
          },
        ],
        responses: {
          "200": {
            description: "The current state of the given TWAMM pair",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    saleRateDeltas: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          time: { type: "integer", minimum: 0 },
                          token0SaleRateDelta: {
                            type: "string",
                            pattern: "^\\d+e?\\d*$",
                            description: "A decimal number",
                          },
                          token1SaleRateDelta: {
                            type: "string",
                            pattern: "^\\d+e?\\d*$",
                            description: "A decimal number",
                          },
                        },
                        required: [
                          "time",
                          "token0SaleRateDelta",
                          "token1SaleRateDelta",
                        ],
                      },
                    },
                  },
                  required: ["saleRateDeltas"],
                },
              },
            },
          },
        },
      },
    },
    "/twap/orders/{address}": {
      get: {
        tags: ["TWAP"],
        summary: "List TWAP orders",
        description:
          "Returns the list of TWAP orders currently held by the given address",
        operationId: "get_ListTwapOrders",
        parameters: [
          {
            schema: {
              anyOf: [
                {
                  type: "string",
                  pattern: "^0x[a-fA-F0-9]+$",
                  description: "A hexadecimal number",
                },
                {
                  type: "string",
                  pattern: "^\\d+e?\\d*$",
                  description: "A decimal number",
                },
              ],
              description: "The address of a contract on Starknet",
              title: "Address",
              example: "0x1234",
            },
            required: true,
            name: "address",
            in: "path",
          },
          {
            schema: {
              type: ["boolean", "null"],
              description:
                "Whether to show orders that have zero active sell rate as part of the response",
            },
            required: false,
            name: "showClosed",
            in: "query",
          },
        ],
        responses: {
          "200": {
            description: "The list of TWAP orders placed by the address",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    orders: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          token_id: { type: "integer", minimum: 1 },
                          orders: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                key: {
                                  type: "object",
                                  properties: {
                                    sell_token: {
                                      anyOf: [
                                        {
                                          type: "string",
                                          pattern: "^0x[a-fA-F0-9]+$",
                                          description: "A hexadecimal number",
                                        },
                                        {
                                          type: "string",
                                          pattern: "^\\d+e?\\d*$",
                                          description: "A decimal number",
                                        },
                                      ],
                                      description:
                                        "The address of a contract on Starknet",
                                      title: "Address",
                                      example:
                                        "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
                                    },
                                    buy_token: {
                                      anyOf: [
                                        {
                                          type: "string",
                                          pattern: "^0x[a-fA-F0-9]+$",
                                          description: "A hexadecimal number",
                                        },
                                        {
                                          type: "string",
                                          pattern: "^\\d+e?\\d*$",
                                          description: "A decimal number",
                                        },
                                      ],
                                      description:
                                        "The address of a contract on Starknet",
                                      title: "Address",
                                      example:
                                        "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
                                    },
                                    fee: {
                                      type: "string",
                                      example:
                                        "1020847100762815411640772995208708096",
                                    },
                                    start_time: {
                                      type: "integer",
                                      minimum: 0,
                                      description:
                                        "The epoch time in seconds at which the order starts",
                                    },
                                    end_time: {
                                      type: "integer",
                                      minimum: 0,
                                      description:
                                        "The epoch time in seconds at which the order ends",
                                    },
                                  },
                                  required: [
                                    "sell_token",
                                    "buy_token",
                                    "fee",
                                    "start_time",
                                    "end_time",
                                  ],
                                  description:
                                    "The key identifier for a TWAP order in Ekubo",
                                },
                                block_time_at_start: {
                                  type: "integer",
                                  minimum: 0,
                                },
                                last_order_update: {
                                  type: "integer",
                                  minimum: 0,
                                },
                                total_proceeds_withdrawn: {
                                  type: "string",
                                  pattern: "^\\d+e?\\d*$",
                                  description: "A decimal number",
                                },
                                total_amount_sold_before_last_update: {
                                  type: "string",
                                  pattern: "^\\d+e?\\d*$",
                                  description: "A decimal number",
                                },
                              },
                              required: [
                                "key",
                                "block_time_at_start",
                                "last_order_update",
                                "total_proceeds_withdrawn",
                                "total_amount_sold_before_last_update",
                              ],
                            },
                          },
                        },
                        required: ["token_id", "orders"],
                      },
                      description:
                        "The list of TWAP orders currently and/or previously owned by the address, depending on `showClosed`",
                    },
                  },
                  required: ["orders"],
                },
              },
            },
          },
        },
      },
    },
    "/limit-orders/orders/{address}": {
      get: {
        tags: ["Limit Orders"],
        summary: "List limit orders",
        description:
          "Returns the list of limit orders currently held by the given address",
        operationId: "get_ListLimitOrders",
        parameters: [
          {
            schema: {
              anyOf: [
                {
                  type: "string",
                  pattern: "^0x[a-fA-F0-9]+$",
                  description: "A hexadecimal number",
                },
                {
                  type: "string",
                  pattern: "^\\d+e?\\d*$",
                  description: "A decimal number",
                },
              ],
              description: "The address of a contract on Starknet",
              title: "Address",
              example: "0x1234",
            },
            required: true,
            name: "address",
            in: "path",
          },
          {
            schema: {
              type: ["boolean", "null"],
              description:
                "Whether to show limit orders that have already been closed",
            },
            required: false,
            name: "showClosed",
            in: "query",
          },
        ],
        responses: {
          "200": {
            description:
              "The list of limit orders held or previously held by the address",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    orders: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          token_id: { type: "integer", minimum: 1 },
                          orders: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                key: {
                                  type: "object",
                                  properties: {
                                    token0: {
                                      anyOf: [
                                        {
                                          type: "string",
                                          pattern: "^0x[a-fA-F0-9]+$",
                                          description: "A hexadecimal number",
                                        },
                                        {
                                          type: "string",
                                          pattern: "^\\d+e?\\d*$",
                                          description: "A decimal number",
                                        },
                                      ],
                                      description:
                                        "The address of a contract on Starknet",
                                      title: "Address",
                                      example:
                                        "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
                                    },
                                    token1: {
                                      anyOf: [
                                        {
                                          type: "string",
                                          pattern: "^0x[a-fA-F0-9]+$",
                                          description: "A hexadecimal number",
                                        },
                                        {
                                          type: "string",
                                          pattern: "^\\d+e?\\d*$",
                                          description: "A decimal number",
                                        },
                                      ],
                                      description:
                                        "The address of a contract on Starknet",
                                      title: "Address",
                                      example:
                                        "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
                                    },
                                    tick: { type: "number", example: 0 },
                                  },
                                  required: ["token0", "token1", "tick"],
                                  description:
                                    "The key identifier for a limit order in Ekubo",
                                },
                                liquidity: {
                                  type: "string",
                                  pattern: "^\\d+e?\\d*$",
                                  description: "A decimal number",
                                },
                                amount: {
                                  type: "string",
                                  pattern: "^\\d+e?\\d*$",
                                  description: "A decimal number",
                                },
                              },
                              required: ["key", "liquidity", "amount"],
                            },
                          },
                        },
                        required: ["token_id", "orders"],
                      },
                      description:
                        "The list of limit orders owned by the address",
                    },
                  },
                  required: ["orders"],
                },
              },
            },
          },
        },
      },
    },
    "/governance/proposals": {
      get: {
        tags: ["Governance"],
        summary: "List Proposals",
        description: "Returns the list of all proposals",
        operationId: "get_ListProposals",
        responses: {
          "200": {
            description: "The list of proposals",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    proposals: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: {
                            type: "string",
                            pattern: "^0x[a-fA-F0-9]+$",
                            description: "A hexadecimal number",
                          },
                          createdTime: { type: "integer", minimum: 0 },
                          description: {
                            anyOf: [
                              { type: "null" },
                              { type: "string" },
                              { type: "null" },
                            ],
                          },
                          calls: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                to: {
                                  type: "string",
                                  pattern: "^0x[a-fA-F0-9]+$",
                                  description: "A hexadecimal number",
                                },
                                selector: {
                                  type: "string",
                                  pattern: "^0x[a-fA-F0-9]+$",
                                  description: "A hexadecimal number",
                                },
                                calldata: {
                                  type: "array",
                                  items: {
                                    type: "string",
                                    pattern: "^0x[a-fA-F0-9]+$",
                                    description: "A hexadecimal number",
                                  },
                                },
                              },
                              required: ["to", "selector", "calldata"],
                            },
                          },
                          results: {
                            type: "array",
                            items: {
                              type: "array",
                              items: {
                                type: "string",
                                pattern: "^0x[a-fA-F0-9]+$",
                                description: "A hexadecimal number",
                              },
                            },
                          },
                        },
                        required: [
                          "id",
                          "createdTime",
                          "description",
                          "calls",
                          "results",
                        ],
                      },
                    },
                  },
                  required: ["proposals"],
                },
              },
            },
          },
        },
      },
    },
    "/governance/delegates": {
      get: {
        tags: ["Governance"],
        summary: "List Top Delegates",
        description: "Returns the list of top delegates",
        operationId: "get_ListTopDelegates",
        parameters: [
          {
            schema: { type: "integer", minimum: 1, maximum: 1000 },
            required: false,
            name: "pageSize",
            in: "query",
          },
          {
            schema: { type: ["integer", "null"], minimum: 0 },
            required: false,
            name: "start",
            in: "query",
          },
        ],
        responses: {
          "200": {
            description: "The list of top delegates",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    delegates: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          delegate: {
                            anyOf: [
                              {
                                type: "string",
                                pattern: "^0x[a-fA-F0-9]+$",
                                description: "A hexadecimal number",
                              },
                              {
                                type: "string",
                                pattern: "^\\d+e?\\d*$",
                                description: "A decimal number",
                              },
                            ],
                            description:
                              "The address of a contract on Starknet",
                            title: "Address",
                          },
                          amount: {
                            type: "string",
                            pattern: "^\\d+e?\\d*$",
                            description: "A decimal number",
                          },
                        },
                        required: ["delegate", "amount"],
                      },
                    },
                  },
                  required: ["delegates"],
                },
              },
            },
          },
        },
      },
    },
    "/governance/proposals/{proposalId}/votes": {
      get: {
        tags: ["Governance"],
        summary: "List Votes",
        description: "Returns the list of votes on a proposal",
        operationId: "get_ListVotesOnProposal",
        parameters: [
          {
            schema: {
              type: "string",
              pattern: "^0x[a-fA-F0-9]+$",
              description: "The ID of the proposal",
            },
            required: true,
            name: "proposalId",
            in: "path",
          },
        ],
        responses: {
          "200": {
            description: "The list of votes on a specific proposal",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    votes: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          time: { type: "integer", minimum: 0 },
                          voter: {
                            anyOf: [
                              {
                                type: "string",
                                pattern: "^0x[a-fA-F0-9]+$",
                                description: "A hexadecimal number",
                              },
                              {
                                type: "string",
                                pattern: "^\\d+e?\\d*$",
                                description: "A decimal number",
                              },
                            ],
                            description:
                              "The address of a contract on Starknet",
                            title: "Address",
                          },
                          weight: {
                            type: "string",
                            pattern: "^\\d+e?\\d*$",
                            description: "A decimal number",
                          },
                          yea: { type: "boolean" },
                        },
                        required: ["time", "voter", "weight", "yea"],
                      },
                    },
                  },
                  required: ["votes"],
                },
              },
            },
          },
        },
      },
    },
    "/governance/delegates/{address}": {
      get: {
        tags: ["Governance"],
        summary: "Get Staker Info",
        description:
          "Returns information about a particular staker address: the addresses they have delegated to and the total amount delegated to them",
        operationId: "get_GetStakerInfo",
        parameters: [
          {
            schema: {
              anyOf: [
                {
                  type: "string",
                  pattern: "^0x[a-fA-F0-9]+$",
                  description: "A hexadecimal number",
                },
                {
                  type: "string",
                  pattern: "^\\d+e?\\d*$",
                  description: "A decimal number",
                },
              ],
              description: "The address of a contract on Starknet",
              title: "Address",
            },
            required: true,
            name: "address",
            in: "path",
          },
        ],
        responses: {
          "200": {
            description: "Information about the given staker",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    amountDelegatedTo: {
                      type: "string",
                      pattern: "^\\d+e?\\d*$",
                      description: "A decimal number",
                    },
                    delegates: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          delegate: {
                            anyOf: [
                              {
                                type: "string",
                                pattern: "^0x[a-fA-F0-9]+$",
                                description: "A hexadecimal number",
                              },
                              {
                                type: "string",
                                pattern: "^\\d+e?\\d*$",
                                description: "A decimal number",
                              },
                            ],
                            description:
                              "The address of a contract on Starknet",
                            title: "Address",
                          },
                          amount: {
                            type: "string",
                            pattern: "^\\d+e?\\d*$",
                            description: "A decimal number",
                          },
                        },
                        required: ["delegate", "amount"],
                      },
                    },
                  },
                  required: ["amountDelegatedTo", "delegates"],
                },
              },
            },
          },
        },
      },
    },
  },
  webhooks: {},
};
