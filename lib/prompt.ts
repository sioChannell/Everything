export const promptForAPI =
  "Ekubo是在starknet区块链网络上的一个DEX去中心化交易所，而上面我提供的json文件正是Ekubo提供的公共API，下面我提出的所有问题基本上都能通过请求公共API得到正确答案。而我需要你做的是，根据我的提问，返回能提供正确答案的API的URL路径。假如URL路径中有参数，同时我的提问有显式或隐式提供这些参数的话，你需要根据我的提问自动将参数补全，其余的不用返回，不需要其他多余的内容。但如果URL路径中有参数，而我的提问没有提供这些参数，你需要提示我要提供哪些参数。如果我的问题真的无法请求公共API得到答案，请返回：“ERROR”。下面是我的提问：";

export const promptForSumary =
  "根据你给的URL，我顺利请求到了数据。现在请你根据JSON文件中对该API接口的描述和我询问的问题，对返回的结构化数据使用通顺的语句以专业的语气进行总结。注意，越新的数据，在总结中的占比应该越高。对于关键的数据，请完整地引用原始数据，不重要的数据请省略。你只需要对数据进行总结即可，不需要提及数据的来源，不要需要说「根据返回的数据，以下是Ekubo质押者名单的总结」这样的话。你的输出必须使用标准 Markdown 格式，根据需要使用适当的 Markdown 语法来格式化标题、列表、链接、图片和其他元素。用中文回复。下面是我刚刚请求得到的数据：\n";

