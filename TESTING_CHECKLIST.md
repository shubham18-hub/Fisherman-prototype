# ✅ Testing Checklist - Verify Everything Works

## Before Demo Day

### Backend Tests

```bash
cd fish-breeding-ai/backend
```

- [ ] Health check works: `curl http://localhost:8000/health`
- [ ] Satellite data endpoint returns 50 points
- [ ] Prediction endpoint accepts POST requests
- [ ] Farmer registration stores data
- [ ] Alert endpoint logs to console
- [ ] CORS allows frontend requests

### Frontend Tests

```bash
cd fish-breeding-ai/frontend
```

- [ ] App loads without errors
- [ ] Map displays with markers
- [ ] Markers are color-coded correctly
- [ ] Clicking markers shows popup
- [ ] Prediction form accepts input
- [ ] Prediction returns results
- [ ] Registration form submits
- [ ] Auto-refresh works (check every 5 sec)
- [ ] Loading indicators appear
- [ ] No console errors (F12)

### ML Pipeline Tests

```bash
cd fish-breeding-ai/ml_pipeline
```

- [ ] generate_mock_data.py creates CSV
- [ ] CSV has 500 rows
- [ ] train_model.py creates .pkl file
- [ ] Model file is in backend folder
- [ ] Training shows R² > 0.80

## Demo Day Checklist

### 30 Minutes Before
- [ ] Start backend server
- [ ] Start frontend server
- [ ] Open browser to localhost:5173
- [ ] Test one prediction
- [ ] Test one registration
- [ ] Check both terminals for errors

### 5 Minutes Before
- [ ] Refresh browser page
- [ ] Verify map loads
- [ ] Prepare demo data:
  - High: temp=28, chl=2.5, turb=5
  - Low: temp=25, chl=1.0, turb=12

### During Demo
- [ ] Show map first
- [ ] Click 2-3 markers
- [ ] Make prediction with prepared data
- [ ] Register demo farmer
- [ ] Show console logs

## Emergency Fixes

**Map not loading?**
1. Check backend is running
2. Check browser console (F12)
3. Refresh page (Ctrl+R)

**Prediction fails?**
1. Verify model file exists
2. Check backend terminal for errors
3. Use fallback: show pre-made screenshot

**Frontend crashes?**
1. Restart with: `npm run dev`
2. Clear browser cache
3. Use incognito window

## Success Criteria

✅ Map displays 50 colored markers
✅ Predictions return probability 0-100%
✅ Registration shows success message
✅ No red errors in console
✅ Auto-refresh updates data

---

**Test everything the night before! Good luck! 🚀**
