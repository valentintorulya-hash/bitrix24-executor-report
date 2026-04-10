export async function onRequestPost(context) {
    const url = new URL(context.request.url);
    url.search = '';
    const response = await context.env.ASSETS.fetch(new Request(url.toString(), {
        method: 'GET',
        headers: context.request.headers,
    }));
    const newResponse = new Response(response.body, response);
    newResponse.headers.set('X-Frame-Options', 'ALLOWALL');
    newResponse.headers.set('Content-Security-Policy', 'frame-ancestors *');
    return newResponse;
}
