// backend server address
const hostName: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL;

// backend query to create a new link
export async function createLink(albumUrl: string, userId: number | undefined): Promise <{ releaseSlug: string }> {

    try {
        const response = await fetch(`${hostName}/releasesRoute/getReleaseSpotifyUrl`, { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ albumUrl, userId })
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Failed to send album URL' + response.statusText);
        }
    } catch (error) {
        throw new Error('Failed to send album URL' + error);
    }
};

// backend query to remove a release by Id
export async function removeReleaseById(releaseId: number): Promise <void> {

    try {
        const response = await fetch(`${hostName}/releasesRoute/${releaseId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            return 
        } else {
            throw new Error('Failed to delete release' + response.statusText);
        }
    } catch (error) {
        throw new Error('Failed to delete release' + error);
    }
};

// backend query to update a release 
export async function updateRelease(newUrls: {[key: number]: string}, platformsVisibility: {[key: number]: boolean}, releaseId: number) {

    try {
        const response = await fetch(`${hostName}/releasesRoute/${releaseId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newUrls, platformsVisibility })
        })

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Failed to update release' + response.statusText);
        }
    } catch (error) {
        throw new Error('Failed to update release' + error);
    }
};