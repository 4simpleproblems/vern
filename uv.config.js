(() => {
    // Ultraviolet Configuration for Standalone Vern
    const basePath = "/uv/";

    self.__uv$config = {
        prefix: "/uv/service/",
        bare: "/bare/", // Placeholder, usually handled by server
        encodeUrl: Ultraviolet.codec.xor.encode,
        decodeUrl: Ultraviolet.codec.xor.decode,
        handler: "/uv/uv.handler.js",
        client: "/uv/uv.client.js",
        bundle: "/uv/uv.bundle.js",
        config: "/uv.config.js",
        sw: "/uv/uv.sw.js",
        stockSW: "/sw.js",
    };
})();
