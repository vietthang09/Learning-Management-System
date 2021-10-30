<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Create Post</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/css/bootstrap.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/js/bootstrap.bundle.min.js"></script>
    </head>
    <body>
        @if(session('status'))
            <div class="alert alert-success">
                {{ session('status') }}
            </div>
        @endif
        <div class="container">
            <form action="{{ url('store_post') }}" method="post">
                @csrf
                <div class="mb-3 mt-3">
                    <label for="user_id" class="form-label">ID_USER:(Delete when on work)</label>
                    <input type="text" class="form-control" id="user_id" name="user_id" >
                </div>
                <div class="mb-3">
                    <label class="form-label" id="content">Content:</label>
                    <textarea class="form-control" rows="5" id="content" name="content"  placeholder="What's on your mind?"></textarea>
                </div>
                <div class="mb-3">
                    <label for="image_link" class="form-label">Image link:</label>
                    <input type="text" class="form-control" id="image_link" name="image_link" >
                </div>
                <div class="mb-3">
                    <label for="file_link" class="form-label">File link:</label>
                    <input type="text" class="form-control" id="file_link" name="file_link" >
                </div>
                <button type="submit" class="btn btn-primary ">Post</button>
            </form>
        </div>

    </body>
</html>