/*
  # Add product-related columns to category table

  1. New Columns
    - `title` (text) - Display name for the category/product
    - `category` (text) - Product category classification
    - `price` (decimal) - Product price with 2 decimal precision
    - `in_stock` (boolean) - Stock availability status, defaults to true
    - `description` (text) - Detailed product description
    - `image` (text) - File path for Supabase Storage integration

  2. Changes
    - All new columns added with appropriate data types
    - Default values set for boolean and numeric fields
    - Image column prepared for Supabase Storage file paths

  3. Notes
    - Uses conditional column addition to prevent errors if columns already exist
    - Image column stores file paths (e.g., 'products/image-name.jpg') for Supabase Storage
    - Price uses numeric type with precision for currency values
*/

-- Add title column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'category' AND column_name = 'title'
  ) THEN
    ALTER TABLE category ADD COLUMN title text;
  END IF;
END $$;

-- Add category column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'category' AND column_name = 'category'
  ) THEN
    ALTER TABLE category ADD COLUMN category text;
  END IF;
END $$;

-- Add price column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'category' AND column_name = 'price'
  ) THEN
    ALTER TABLE category ADD COLUMN price numeric(10,2) DEFAULT 0;
  END IF;
END $$;

-- Add in_stock column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'category' AND column_name = 'in_stock'
  ) THEN
    ALTER TABLE category ADD COLUMN in_stock boolean DEFAULT true;
  END IF;
END $$;

-- Add description column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'category' AND column_name = 'description'
  ) THEN
    ALTER TABLE category ADD COLUMN description text;
  END IF;
END $$;

-- Add image column for Supabase Storage integration
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'category' AND column_name = 'image'
  ) THEN
    ALTER TABLE category ADD COLUMN image text;
  END IF;
END $$;