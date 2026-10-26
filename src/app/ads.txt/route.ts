// ads.txt tells ad buyers which sellers are authorised to sell this site's ad space (required by AdSense)
export const dynamic = 'force-static';

export function GET() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT; // ca-pub-1234567890123456
  const body = client
    ? `google.com, ${client.replace(/^ca-/, '')}, DIRECT, f08c47fec0942fa0\n`
    : '# AdSense publisher id not configured yet\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
}
