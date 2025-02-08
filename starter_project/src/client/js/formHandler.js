// Replace checkForName with a function that checks the URL
// import { fetch } from 'undici';
import { checkForName } from './nameChecker'

// If working on Udacity workspace, update this with the Server API URL e.g. `https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api`
// const serverURL = 'https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api'
const serverURL = 'https://localhost:8000/api'

const result = document.getElementById('results');

const form = document.getElementById('urlForm');

form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
    event.preventDefault();
    result.innerHTML = '';

    // Get the URL from the input field
    const formText = document.getElementById('name').value;

    console.log(formText);

    // Check if the URL is valid
    if (!formText) {
        result.innerHTML = '<p style="color:red;">Enter a valid URL.</p>';
    }
    // If the URL is valid, send it to the server using the serverURL constant above

    try {
        const response = await fetch(
            'http://localhost:8000/analyze-url',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: formText }),
            }
        );
        console.log(response);
        if (!response.ok)
            throw new Error('Failed to fetch results from the server');

        const res = await response.json();

        console.log(res);

        result.innerHTML = `<pre>${JSON.stringify(res, null, 2)}</pre>`;

    } catch (error) {
        console.error('Error:', error);
        result.innerHTML = '<p style="color:red;">Error fetching analysis results one one .</p>';
    }

}

// Function to send data to the server



// Export the handleSubmit function
export { handleSubmit };

