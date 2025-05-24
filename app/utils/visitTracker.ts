export async function trackVisit(route: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_SUPABASE_API_URL || '';
    const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

    console.log(apiKey);

    const response = await fetch(`${apiUrl}/functions/v1/track-visit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        route,
        user_agent: navigator.userAgent
      })
    });

    if (!response.ok) {
      console.error('Failed to track visit:', await response.text());
    }
  } catch (error) {
    console.error('Error tracking visit:', error);
  }
} 