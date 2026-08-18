import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const adminEmail = process.env.ADMIN_DEFAULT_EMAIL || "rehaansekap@gmail.com";
const adminPassword = process.env.ADMIN_DEFAULT_PASSWORD || "J#5syL0l1789";

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function main() {
  console.log("Connecting to Supabase at:", supabaseUrl);

  // 1. Ensure admin user exists
  try {
    const { data: users, error: listError } = await supabase.auth.admin.listUsers();
    if (listError) {
      console.warn("Could not list users:", listError.message);
    } else {
      const existingUser = users.users.find((u) => u.email === adminEmail);
      if (existingUser) {
        console.log("Admin user already exists:", existingUser.email, `(id: ${existingUser.id})`);
      } else {
        console.log("Creating admin user:", adminEmail);
        const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
          email: adminEmail,
          password: adminPassword,
          email_confirm: true,
        });
        if (createError) {
          console.error("Failed to create admin user:", createError.message);
        } else {
          console.log("Admin user created successfully:", newUser.user.email);
        }
      }
    }
  } catch (err) {
    console.warn("Auth check warning:", err.message);
  }

  // 2. Ensure storage bucket exists
  try {
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
    if (bucketError) {
      console.warn("Could not list buckets:", bucketError.message);
    } else {
      const bucketExists = buckets.some((b) => b.name === "portfolio-assets");
      if (!bucketExists) {
        console.log("Creating bucket 'portfolio-assets'...");
        const { error: createBucketError } = await supabase.storage.createBucket("portfolio-assets", {
          public: true,
        });
        if (createBucketError) {
          console.error("Failed to create bucket:", createBucketError.message);
        } else {
          console.log("Bucket 'portfolio-assets' created successfully.");
        }
      } else {
        console.log("Bucket 'portfolio-assets' already exists.");
      }
    }
  } catch (err) {
    console.warn("Storage check warning:", err.message);
  }

  console.log("Supabase setup verification complete.");
}

main().catch(console.error);
