<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Product;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Product::paginate();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'price' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048', // Validation for the image
        ]);

        $data = $request->all();
        $data['slug'] = \Str::slug($request->name); // Generate a slug from the name

        // Handle image upload
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public'); // Store the image in 'storage/app/public/products'
            $data['image'] = $path; // Save the file path
        }

        return Product::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return $product;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
{
    $product = Product::find($id);

    if (!$product) {
        return response()->json(['message' => 'Product not found'], 404);
    }

    $request->validate([
        'name' => 'sometimes|required',
        'price' => 'sometimes|required',
        'slug' => 'sometimes|required|unique:products,slug,' . $id,
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048', // Validation for the image
    ]);

    $data = $request->all();
    $data['slug'] = \Str::slug($request->name); // Generate a slug from the name

    // Handle image upload
    if ($request->hasFile('image')) {
        // Delete the old image if exists
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        $path = $request->file('image')->store('products', 'public'); // Store the image in 'storage/app/public/products'
        $data['image'] = $path; // Save the file path
    }

    $product->update($data);
    return $product;
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        // Delete the associated image
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();
        return response()->json(['message' => 'Product deleted successfully']);
    }

    /**
     * Search the specified resource from storage.
     */
    public function search(string $id)
    {
        return Product::where('name', 'like', '%' . $id . '%')->get();
    }
}
