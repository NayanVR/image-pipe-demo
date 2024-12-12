**Image Pipe Demo**
=====================

**My Project Overview**
-------------------

I built this project as a submission for an internship assignment. It's a web application that uses React with TypeScript on the client-side and FastAPI with uv package manager on the server-side. I'm pretty proud of what I learn from this project!

We can clip the image with mask using brush and canvas on the client side and we can send it to server if needed. Server is currently storing these images on local storage with unique id for pair of images.

**The Client-Side App**
---------------------------

I used React with TypeScript to build the client-side application. I chose [Tailwind CSS](https://tailwindcss.com/) for styling because I love how easy it is to use and how great it looks. I also used the `react-canvas-draw` library to enable drawing on the canvas. It was a lot of fun to play around with!

### Running the Client-Side App Locally

* Navigate to the `client` directory
* Run `pnpm install` or `npm install` to install the dependencies
* Make `.env.local` using `.env.example` as a template and fill in the required values `cp .env.example .env.local`
* Start the app by running `pnpm dev` or `npm run dev` in the terminal
* Open your web browser and head to `http://localhost:5173/` to check it out

**The Server-Side App**
---------------------------

For the server-side application, I used FastAPI with [uv  package manager](https://docs.astral.sh/uv/). I built a RESTful API for image processing and storage. It was a great learning experience!

### Running the Server-Side App Locally

* Navigate to the `server` directory & make sure uv is installed
* Run `uv sync` to install the dependencies
* Start the app with `uvicorn` by running `uv run -- uvicorn main:app --reload --host 0.0.0.0 --port 8000` in the terminal

**Libraries I Used**
------------------

* [`react-canvas-draw`](https://www.npmjs.com/package/react-canvas-draw): an awesome library for drawing and manipulating images on the canvas
* [`tailwindcss`](https://tailwindcss.com/): my go-to CSS framework for styling and layout
* [`FastAPI`](https://fastapi.tiangolo.com): a modern, fast (high-performance), web framework for building APIs

**Challenges I Faced**
--------------------

One of the challenges I faced was creating a clipped image using a mask and the original image. But I persevered and figured it out using mathematical calculations and referencing the MDN documentation for canvas drawing.