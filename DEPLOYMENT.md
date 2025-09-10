# ThinPlan Frontend Deployment

## 🚀 Quick Deployment

Instead of running these commands manually:

```bash
npm install --force
npm run build
pm2 restart 14
```

Just run:

```bash
./deploy.sh
```

## 📋 Features

- ✅ **Automated workflow**: Install, build, and restart in one command
- ✅ **Error handling**: Stops if any step fails
- ✅ **Colored output**: Clear visual feedback for each step
- ✅ **Status verification**: Checks if PM2 process is online after restart
- ✅ **Flexible PM2 ID**: Can specify different PM2 process IDs
- ✅ **Help system**: Built-in usage instructions

## 🎯 Usage

### Basic Usage (default PM2 ID: 14)

```bash
./deploy.sh
```

### Specify Custom PM2 Process ID

```bash
./deploy.sh 15
```

### Show Help

```bash
./deploy.sh --help
```

## 🔧 What the Script Does

1. **Dependency Check**: Verifies Node.js, npm, and PM2 are installed
2. **Install Dependencies**: Runs `npm install --force`
3. **Build Application**: Runs `npm run build`
4. **Restart PM2**: Only restarts if build succeeds
5. **Status Check**: Verifies the application is running
6. **Summary**: Shows deployment completion status

## 📊 Example Output

```
🚀 Starting ThinPlan Frontend Deployment...
==========================================
Target PM2 Process ID: 14

[INFO] Checking dependencies...
[SUCCESS] All dependencies are available
[INFO] Installing dependencies with --force flag...
[SUCCESS] Dependencies installed successfully
[INFO] Building the application...
[SUCCESS] Application built successfully
[INFO] Restarting PM2 process (ID: 14)...
[SUCCESS] PM2 process restarted successfully
[SUCCESS] Application is now running and online

==========================================
[SUCCESS] Deployment completed successfully!

📊 Deployment Summary:
   ✅ Dependencies installed
   ✅ Application built
   ✅ PM2 process restarted

🌐 Your application should now be running
==========================================
```

## ⚠️ Error Handling

The script will stop and show an error message if:

- Required dependencies are missing
- `npm install` fails
- `npm run build` fails
- PM2 restart fails

## 🔄 PM2 Process Management

- **Default PM2 ID**: 14 (can be changed)
- **Status Check**: Automatically verifies process is online
- **Graceful Restart**: Only restarts after successful build

## 🛠️ Troubleshooting

If you encounter issues:

1. **Permission denied**: Make sure the script is executable

   ```bash
   chmod +x deploy.sh
   ```

2. **PM2 not found**: Install PM2 globally

   ```bash
   npm install -g pm2
   ```

3. **Build fails**: Check for TypeScript or build errors in your code

4. **Custom PM2 ID**: Verify the PM2 process ID exists
   ```bash
   pm2 list
   ```

## 📝 Notes

- The script uses `--force` flag for npm install as requested
- Build process must complete successfully before PM2 restart
- All steps are logged with timestamps and status indicators
- Script is designed to be idempotent (can be run multiple times safely)
