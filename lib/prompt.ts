export const promptForAPI =
  "Ekubo是在starknet区块链网络上的一个DEX去中心化交易所，而上面我提供的json文件正是Ekubo提供的公共API，下面我提出的所有问题基本上都能通过请求公共API得到正确答案。而我需要你做的是，根据我的提问，返回能提供正确答案的API的URL路径。假如URL路径中有参数，同时我的提问有显式或隐式提供这些参数的话，你需要根据我的提问自动将参数补全，其余的不用返回，不需要其他多余的内容。但如果URL路径中有参数，而我的提问没有提供这些参数，你需要提示我要提供哪些参数。如果我的问题真的无法请求公共API得到答案，请返回：“ERROR”。下面是我的提问：";

export const promptForAPI_ENGLISH =
  "Ekubo is a decentralized exchange (DEX) on the Starknet blockchain network, and the JSON file I provided above is the public API provided by Ekubo. All the questions I will ask below can basically be answered correctly by requesting the public API. What I need you to do is, based on my questions, return the correct API URL path that provides the answer. If the URL path contains parameters, and my question explicitly or implicitly provides these parameters, you need to automatically fill in the parameters based on my question and return only the completed URL path, without any additional content. However, if the URL path contains parameters and my question does not provide them, you need to prompt me to provide those parameters. If my question cannot be answered through the public API, please return: \"ERROR\". Here are my questions:";

export const promptForSumary =
  "根据你给的URL，我顺利请求到了数据。现在请你根据JSON文件中对该API接口的描述和我询问的问题，对返回的结构化数据使用通顺的语句以专业的语气进行总结。注意，越新的数据，在总结中的占比应该越高。对于关键的数据，请完整地引用原始数据，不重要的数据请省略。你只需要对数据进行总结即可，不需要提及数据的来源，不要需要说「根据返回的数据，以下是Ekubo质押者名单的总结」这样的话。你的输出必须使用标准 Markdown 格式，根据需要使用适当的 Markdown 语法来格式化标题、列表、链接、图片和其他元素。用中文回复。下面是我刚刚请求得到的数据：\n";

export const promptForSumary_ENGLISH =
  "Based on the URL you provided, I successfully requested the data. Now, please summarize the structured data returned according to the description of the API interface in the JSON file and the questions I asked. Use clear sentences and a professional tone for the summary. Note that newer data should occupy a larger proportion in the summary. For key data, please quote the original data completely, and omit less important data. You only need to summarize the data, and there is no need to mention the source of the data. Do not say phrases like 'Based on the returned data, here is the summary of the Ekubo staker list.' Your output must be in standard Markdown format, using appropriate Markdown syntax for formatting titles, lists, links, images, and other elements. If I am asking in English, please answer in English. If I am asking in Chinese, please answer in Chinese. Below is the data I just requested:";
