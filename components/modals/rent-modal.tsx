"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import useRentModal from "@/hooks/use-rent-modal";
import Heading from "../heading";
import { categories } from "../nav/categories";
import CountrySelect from "../inputs/country-select";
import Counter from "../inputs/counter";
import Input from "../ui/input";
import Modal from "./modal";
import CategoryInput from "../inputs/category-input";
import FileUpload from "../file-upload";
import { useMutation } from "@tanstack/react-query";
import useProfileId from "@/hooks/use-profileId";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5
}

////

function RentModal() {
  //hooks
  const router = useRouter();
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);

  //form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset
  } = useForm<FieldValues>({
    defaultValues: { category: "", location: null, guestCount: 1, roomCount: 1, bathroomCount: 1, imageSrc: "", price: 1, title: "", description: "" }
  });

  //watch values
  const location = watch("location");
  const category = watch("category");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  //lazy load map
  const Map = useMemo(() => dynamic(() => import("../map"), { ssr: false }), [location]);

  //set custom value
  const setCustomValue = (id: string, value: any) => setValue(id, value, { shouldDirty: true, shouldTouch: true, shouldValidate: true });

  //navigation
  const onBack = () => setStep((value) => value - 1);
  const onNext = () => setStep((value) => value + 1);

  function onSubmit(values: FieldValues) {
    if (step !== STEPS.PRICE) onNext();
    else createPlace(values);
  }

  //create place
  const { mutate: createPlace, isLoading } = useMutation({
    mutationFn: async (values: FieldValues) => {
      await axios.post("/api/listings", values);
    },
    onSuccess: () => {
      toast.success("Listing created!");
      router.refresh();
      reset();
      setStep(STEPS.CATEGORY);
      rentModal.onClose();
    },
    onError: (err) => {
      console.log("[create_listing]", err);
    }
  });

  //get action label
  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) return "Create";
    return "Next";
  }, [step]);

  //get secondary action label
  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) return undefined;
    return "Back";
  }, [step]);

  //create body content
  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Which of these best describes your place?" subtitle="Pick a category" />
      <div className=" grid  grid-cols-1  md:grid-cols-2  gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput onClick={(category) => setCustomValue("category", category)} selected={category === item.label} label={item.label} icon={item.icon} />
          </div>
        ))}
      </div>
    </div>
  );

  //create location
  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Where is your place located?" subtitle="Help guests find you!" />
        <CountrySelect value={location} onChange={(value) => setCustomValue("location", value)} />
        <Map center={location?.latlng} />
      </div>
    );
  }

  //create info
  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Share some basics about your place" subtitle="What amenitis do you have?" />
        <Counter onChange={(value) => setCustomValue("guestCount", value)} value={guestCount} title="Guests" subtitle="How many guests do you allow?" />
        <hr />
        <Counter onChange={(value) => setCustomValue("roomCount", value)} value={roomCount} title="Rooms" subtitle="How many rooms do you have?" />
        <hr />
        <Counter onChange={(value) => setCustomValue("bathroomCount", value)} value={bathroomCount} title="Bathrooms" subtitle="How many bathrooms do you have?" />
      </div>
    );
  }

  //create images
  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Add a photo of your place" subtitle="Show guests what your place looks like!" />
        <FileUpload onChange={(value) => setCustomValue("imageSrc", value)} value={imageSrc} endpoint="placeImage" />
      </div>
    );
  }

  //create description
  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="How would you describe your place?" subtitle="Short and sweet works best!" />
        <Input id="title" label="Title" disabled={isLoading} register={register} errors={errors} required />
        <hr />
        <Input id="description" label="Description" disabled={isLoading} register={register} errors={errors} required />
      </div>
    );
  }

  //create price
  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Now, set your price" subtitle="How much do you charge per night?" />
        <Input id="price" label="Price" formatPrice type="number" disabled={isLoading} register={register} errors={errors} required />
      </div>
    );
  }

  ////

  return <Modal disabled={isLoading} isOpen={rentModal.isOpen} title="Airbnb your home!" actionLabel={actionLabel} onSubmit={handleSubmit(onSubmit)} secondaryActionLabel={secondaryActionLabel} secondaryAction={step === STEPS.CATEGORY ? undefined : onBack} onClose={rentModal.onClose} body={bodyContent} />;
}

export default RentModal;
