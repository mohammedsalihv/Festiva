 <div className="space-y-2">
              <label className="font-semibold text-sm mb-2">
                Select your car features
              </label>
              {studioServiceFeaturesOptions.map((feature) => (
                <label key={feature} className="flex items-center gap-2">
                  <Checkbox
                    checked={studioForm.serviceFeatures.includes(feature)}
                    onCheckedChange={(checked) =>
                      handleCheckbox(checked, feature, "serviceFeatures")
                    }
                    className={
                      errors.serviceFeatures?.length > 0
                        ? "border-red-600"
                        : "border-black"
                    }
                  />
                  {feature}
                </label>
              ))}
              {errors.serviceFeatures && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.serviceFeatures}
                </p>
              )}
            </div>




  const handleCheckbox = (
    checked: boolean | "indeterminate",
    id: string,
    type: "serviceFeatures" | "serviceFeatures"
  ) => {
    setStudioForm((prev) => {
      const updatedList = checked
        ? [...prev[type], id]
        : prev[type].filter((item) => item !== id);

      return {
        ...prev,
        [type]: updatedList,
      };
    });

    if (errors[type]) {
      setErrors((prev) => ({ ...prev, [type]: "" }));
    }
  };

