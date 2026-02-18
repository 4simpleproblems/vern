(() => {
    // Ultraviolet Configuration for Standalone Vern
    const basePath = "/uv/";

    self.__uv$config = {
        prefix: basePath + "service/",
        encodeUrl: Ultraviolet.codec.xor.encode,
        decodeUrl: Ultraviolet.codec.xor.decode,
        handler: basePath + "uv.handler.js",
        client: basePath + "uv.client.js",
        bundle: basePath + "uv.bundle.js",
        config: "/uv.config.js",
        sw: basePath + "uv.sw.js",
        stockSW: "/sw.js",
    };
})();
