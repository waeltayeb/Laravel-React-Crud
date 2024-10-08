<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Carbon\Carbon;


class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Product::select('id','name', 'price', 'description', 'image')->get();
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'price' => 'required',
            'description' => 'required',
            'image' => 'required|image'
        ]);
        $imageName = Str::random().'.'.$request->image->getClientOriginalExtension();
        Storage::disk('public')->putFileAs('product/image', $request->image, $imageName);
        Product::create($request->post()+['image'=>$imageName]);
        return response()->json([
            'message' => 'Product Created Successfully!!'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return response()->json([
            'product' => $product
        ]);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required',
            'price' => 'required',
            'description' => 'required',
            'image' => 'nullable'
        ]);

        $product->fill($request->post())->update();


        if ($request->hasFile('image')) {
            if ($product->image) {
                    $exist = Storage::disk('public')->exists("product/image/{$product->image}"  );
                    if ($exist) {
                    Storage::disk('public')->delete("product/image/{$product->image}");
                    }
            }

        $imageName = Str::random() . '.' . $request->image->getClientOriginalExtension();
        Storage::disk('public')->putFileAs('product/image', $request->image, $imageName);
        $product->image = $imageName;
        $product->save();

        }


        return response()->json([
            'message' => 'Item updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        if ($product->image) {
            $exist = Storage::disk('public')->exists("product/image/{$product->image}");
            if ($exist) {
                Storage::disk('public')->delete("product/image/{$product->image}");
            }
        }
        $product->delete();
        return response()->json([
            'message' => 'Item deleted successfully'
        ]);
    }
}
